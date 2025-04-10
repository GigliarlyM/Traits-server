import websocketPlugin from "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { WebSocket } from "ws";
import sendMessageToAi from "./ia/aiConnection";

interface ChatMessage {
  type: 'message' | 'error' | 'join' | 'leave';
  user: string | null;
  message: string;
  to?: string;
  timestamp: Date;
}

export async function webSocketRoutes(fastify: FastifyInstance) {
  await fastify.register(websocketPlugin);

  const activeConnections = new Map<string, WebSocket>();

  fastify.get('/chat', {
    websocket: true,
  }, (connection, request) => {
    const socket = connection
    let userId = Math.random().toString(36).substring(2, 9)

    activeConnections.set(userId, socket)
    console.log(`Novo cliente conectado: ${userId}`)

    socket.on('message', (rawMessage) => {
      try {
        const message: ChatMessage = JSON.parse(rawMessage.toString())
        message.timestamp = new Date()

        if (message.user == null) {
          message.user = userId
        }

        if (message.user.length >= 4) {
          if (message.user !== userId) {
            activeConnections.delete(userId)
            userId = message.user
            console.log(`Cliente id modificado: ${userId}`)
            activeConnections.set(userId, socket)
          }
          console.log(message)
        } else {
          message.user = userId
        }

        if (message.type == `message`) {
          broadcastMessage(message, message.to)
        } else if (message.type == "join") {
          systemMessage(socket, userId)
        } else {
          if (message.user.length >= 4) {
            if (message.user !== userId) {
              activeConnections.delete(userId)
              userId = message.user
              console.log(`Cliente id modificado: ${userId}`)
              activeConnections.set(userId, socket)
            } else {
              message.user = userId
            }
          } 
        }

      } catch (error) {
        console.error("Erro ao processar mensagem")
        socket.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }))
      }
    })

    socket.on('close', () => {
      activeConnections.delete(userId)
      console.log(`Cliente desconectado`)
    })
  })

  function broadcastMessage(message: ChatMessage, to?: string) {
    const messageString = JSON.stringify(message)

    if (to !== undefined && to !== null) {
      if (activeConnections.has(to)) {
        activeConnections.get(to)?.send(messageString)
        activeConnections.get(message.user!)?.send(messageString)
      } else if (to == "chat-ia") {
        sendMessageToAi(message.message).then((response) => {
          if (response != null) {
            const responseMessage: ChatMessage = {
              type: 'message',
              user: 'AI',
              message: response(),
              timestamp: new Date(),
            }

            activeConnections.get(message.user!)?.send(JSON.stringify(responseMessage))
          }else {
            const errorMessage: ChatMessage = {
              type: 'error',
              message: 'Ocorreu um erro ao enviar a mensagem para o AI',
              user: 'System',
              timestamp: new Date(),
            }
            activeConnections.get(message.user!)?.send(JSON.stringify(JSON.stringify(errorMessage)))
          }
        })
      }

      return
    }

    activeConnections.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString)
      }
    })
  }

  function systemMessage(socket: WebSocket, userId: string) {
    const responsePattern: ChatMessage = {
      type: 'message',
      user: `System`,
      message: `id: ${userId}`,
      timestamp: new Date,
    }

    socket.send(JSON.stringify(responsePattern))
  }
}
import websocketPlugin from "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { WebSocket } from "ws";

interface ChatMessage {
  type: 'message' | 'error' | 'join' | 'leave';
  user: string;
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
        if (message.user.length >= 4) {
          if (message.user !== userId) {
            activeConnections.delete(userId)
            userId = message.user
            console.log(`Cliente id modificado: ${userId}`)
            activeConnections.set(userId, socket)
          }
        } else {
          message.user = userId
        }

        if (message.type == `message`) {
          broadcastMessage(message, message.to)
        } else {
          if (message.user.length >= 4) {
            if (message.user !== userId) {
              activeConnections.delete(userId)
              userId = message.user
              console.log(`Cliente id modificado: ${userId}`)
              activeConnections.set(userId, socket)
            }
          } else {
            message.user = userId
          }

          systemMessage(socket, userId)
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
        activeConnections.get(message.user)?.send(messageString)
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
      message: `Seu user id eh ${userId}`,
      timestamp: new Date,
    }

    socket.send(JSON.stringify(responsePattern))
  }
}
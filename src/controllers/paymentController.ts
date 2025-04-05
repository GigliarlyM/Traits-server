import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import Arte from "../model/arte";
import Cliente from "../model/cliente";
import Pagamento from "../model/pagamentos";
import { ObjectId } from "mongoose";

export const createPayment = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/payment', {
    schema: {
      body: z.object({
        items: z.array(z.string()),
        formaPagamento: z.string(),
        cliente: z.string().email()
      })
    }
  }, async (request, reply) => {
    const { items, formaPagamento, cliente } = request.body

    try {
      const payment = new Pagamento({ quaisItens: items, formaPagamento, cliente })
      await payment.save()

      return { payment }
    } catch (_) {
      reply.status(400)
      console.error("Erro ao savar o payment")
      return { message: 'Error saving payment' }
    }
  })
}

export const confirmPayment = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/payment/:id', {
    schema: {
      params: z.object({
        id: z.string()
      })
    }
  }, async (request) => {
    const { id } = request.params

    const payment = await Pagamento.findByIdAndUpdate(id, { status: true })

    return { payment }
  })
}

export const getPayment = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get('/payment/client/:name', {
    schema: {
      params: z.object({
        name: z.string()
      })
    }
  }, async (request) => {
    const { name } = request.params

    const cliente = await Cliente.findOne({ nome: name })
    const payments = await Pagamento.find({ cliente: cliente?.email })

    console.log(payments)

    return { payments }
  })
}
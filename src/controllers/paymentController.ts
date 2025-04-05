import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import Pagamento from "../model/pagamentos";

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
    app.withTypeProvider<ZodTypeProvider>().get('/payment/:"id', {
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
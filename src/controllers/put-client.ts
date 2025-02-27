import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { updateClientModel } from "../model/client";

export default async function putClient(app: FastifyInstance) {
    //@Todo: mudar o IdPppher
    app.withTypeProvider<ZodTypeProvider>().put('/client/:cpfClient', {
        schema: {
            params: z.object({
                cpfClient: z.string()
            }),
            body: z.object({
                apelido: z.string().min(3).max(50),
                email: z.string().email(),
            })
        },
    }, async (request) => {
        const { cpfClient } = request.params
        const { apelido, email } = request.body

        const client = await updateClientModel(cpfClient, {apelido, email})

        return { client }
    })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createClientModel } from "../model/client";
import generateToken from "./token/generate-token";

export default async function createClient (app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/client', {
        schema: {
            body: z.object({
                nome: z.string().min(3).max(50),
                apelido: z.string().min(3).max(50),
                email: z.string().email(),
                cpf: z.string().min(11)
            })
        },
    }, async (request) => {
        const newClient = request.body

        const client = await createClientModel(newClient)

        const token = await generateToken(newClient)

        return { client, token }
    })
}
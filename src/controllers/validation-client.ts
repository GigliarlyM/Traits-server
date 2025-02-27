import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { validationClientModel } from "../model/credencial-validation";
import generateToken from "./token/generate-token";

export default async function validationClient(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/client/validation', {
        schema: {
            body: z.object({
                email: z.string().email()
            })
        },
    }, async (request) => {
        const { email } = request.body

        const client = await validationClientModel(email)

        const token = await generateToken({
            nome: client.nome,
            email: client.email,
            cpf: client.cpf,
            apelido: client.apelido
        })

        return { client, token }
    })
}
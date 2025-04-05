import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import Cliente from "../model/cliente";
import { generateToken } from "./token/generate-token";

export default async function login(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/login', {
        schema: {
            body: z.object({
                email: z.string().email(),
                senha: z.string().min(6)
            })
        },
    }, async (request) => {
        const { email, senha } = request.body

        const cliente = await Cliente.findOne({ email: email })
        if (!cliente || cliente.senha !== senha) {
            console.error("Credenciais invalidas")
            return { message: "Credenciais invalidas" }
        }

        const token = await generateToken(
            { nome: cliente.nome, idade: cliente.idade, email: cliente.email }
        )

        return { name: cliente.nome, email, token }
    })
}
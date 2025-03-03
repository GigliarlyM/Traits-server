import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import artistaModel from "../model/artista";
import { generateToken } from "./token/generate-token";

export default async function validation(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/login', {
        schema: {
            body: z.object({
                userName: z.string(),
                senha: z.string().min(6)
            })
        },
    }, async (request) => {
        const { userName, senha } = request.body

        const artista = await artistaModel.findOne({ userName: userName })
        if (!artista || artista.senha !== senha) {
            throw new Error('Credenciais inválidas')
        }

        const token = await generateToken(
            { nome: artista.nome, userName: artista.userName, idade: artista.idade }
        )

        return { userName, token }
    })
}
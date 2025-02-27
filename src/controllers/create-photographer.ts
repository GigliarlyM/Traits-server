import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createPhotographerModel } from "../model/photographer";
import generateToken from "./token/generate-token";

export default async function createPhotographer(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/photographer', {
        schema: {
            body: z.object({
                nome: z.string().min(3).max(50),
                apelido: z.string().min(3).max(50),
                dataNascimento: z.coerce.date(),
                email: z.string().email(),
                cpf: z.string().min(11)
            })
        },
    }, async (request) => {
        const {nome, apelido, dataNascimento, email, cpf} = request.body

        const photographer = await createPhotographerModel({nome, apelido, dataNascimento, email, cpf, role: 'photographer'})

        const photographerObject = {
            cpf: photographer.cpf,
            nome: photographer.nome,
            apelido: photographer.apelido,
            email: photographer.email
        }

        const token = await generateToken(photographerObject);

        return { photographer, token }
    })
}
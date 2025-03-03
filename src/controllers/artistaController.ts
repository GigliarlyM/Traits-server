import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import artistaModel from "../model/artista";
import { generateToken } from "./token/generate-token";

async function createArtista(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/artista', {
        schema: {
            body: z.object({
                nome: z.string().min(3).max(50),
                idade: z.coerce.number(),
                userName: z.string(),
                senha: z.string().min(6)
            })
        },
    }, async (request) => {
        const newArtista = request.body

        const artista = await artistaModel.insertOne(newArtista)

        const token = await generateToken(newArtista)

        return { artista, token }
    })
}

async function updateArtista(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put('/artista/:userName', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            }),
            body: z.object({
                nome: z.string().min(3).max(50),
                idade: z.coerce.number(),
                senha: z.string().min(6)
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const updatedArtista = request.body

        const artista = await artistaModel.findOneAndUpdate({ userName: userName }, updatedArtista)

        return { artista }
    })
}

async function getArtista(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/artista/:userName', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const artista = await artistaModel.findOne({ userName: userName })

        return { artista }
    })
}


async function deleteArtista(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/artista/:userName', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const artistadeleted = await artistaModel.findOneAndDelete({ userName: userName })

        return { artistadeleted }
    })
}

export {
    createArtista,
    updateArtista,
    getArtista,
    deleteArtista
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import artistaModel from "../model/artista";
import arteModel from "../model/arte"

async function addArte(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/artista/:userName/arte', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            }),
            body: z.object({
                titulo: z.string(),
                descricao: z.string(),
                imagem: z.string(),
                valor: z.coerce.number(),
                genero: z.string()
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const arte = request.body
        const artista = await artistaModel.findOne({ userName: userName })
        if (!artista) {
            throw new Error('Artista não encontrado')
        }
        const arteCreated = await arteModel.insertOne(arte)

        artista.artes.push(arteCreated.id)
        await artistaModel.findOneAndUpdate(
            { userName: artista.userName },
            { artes: artista.artes }
        )

        return { userName, arteCreated }
    })
}

async function getArte(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/artista/:userName/arte', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const artista = await artistaModel.findOne({ userName: userName })
        if (!artista) {
            throw new Error('Artista não encontrado')
        }

        const artes = await arteModel.find({ _id: artista.artes })

        return { userName, artes }
    })
}

export {
    addArte,
    getArte
}
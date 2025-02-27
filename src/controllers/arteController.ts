import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import artistaModel from "../model/artista";
import arteModel from "../model/arte"
import generateToken from "./token/generate-token";

async function addArte(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/artista/:userName/arte', {
        schema: {
            params: z.object({
                userName: z.coerce.number()
            }),
            body: z.object({
                titulo: z.string(),
                blob: z.string(),
                valor: z.coerce.number(),
                genero: z.string()
            })
        }
    }, async (request) => {
        const { userName } = request.params
        const arte = request.body
        const arteCreated = await arteModel.insertOne(arte)
        const artista = await artistaModel.findOne({ userName: userName })

        artista?.artes.push(arteCreated.id)
        await artistaModel.findOneAndUpdate({ userName: artista?.userName }, { artes: artista?.artes })

        return { userName, arteCreated }
    })
}

module.exports = {
    addArte
}
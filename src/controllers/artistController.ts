import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import Artista from "../model/artista";
import Cliente from "../model/cliente";

export const createArtist = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/artist', {
        schema: {
            body: z.object({
                userName: z.string().min(4),
                clientEmail: z.string()
            })
        }
    }, async (request, response) => {
        // Requisicao sem permanencia
        const { userName, clientEmail } = request.body

        const artist = {
            userName: userName,
            client: clientEmail,
            artes: []
        }

        return { artist }
    })
}

export const getArtist = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/artist/:userName', {
        schema: {
            params: z.object({
                userName: z.string()
            })
        }
    }, async (request, response) => {
        const { userName } = request.params

        const artist = await Artista.findOne({ userName: userName })

        return { artist }
    })
}

export const getArtistNameClient = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/artist/client/:name', {
        schema: {
            params: z.object({
                name: z.string()
            })
        }
    }, async (request, response) => {
        const { name } = request.params
        console.log("Para buscar o artista pelo o nome: ", name)

        try {
            const client = await Cliente.findOne({ nome: name })
            if (client) {
                const artist = await Artista.findOne({ client: client.email })

                return { artist }
            } else {
                throw new Error("Cliente não encontrado: " + name)
            }
        } catch (err) {
            console.log((err as Error).message)
            return { message: (err as Error).message }
        }
    })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import Artista from "../model/artista";

export const createArtist = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/artist', {
        schema: {
            body: z.object({
                userName: z.string().min(4),
                clientEmail: z.string()
            })
        }
    }, async (request, response) => {
        const { userName, clientEmail } = request.body

        const artist = new Artista({ userName, client: clientEmail })
	await artist.save()

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

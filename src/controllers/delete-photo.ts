import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { deletePhotoModel } from "../model/service";

export default async function deletePhoto(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete('/photo/:cpfPhotographer/:idPhoto', {
        schema: {
            params: z.object({
                idPhoto: z.coerce.number(),
                cpfPhotographer: z.string()
            })
        },
    }, async (request) => {
        const { idPhoto, cpfPhotographer } = request.params

        const photos = await deletePhotoModel(idPhoto, cpfPhotographer)

        return { photos }
    })
}
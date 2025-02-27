import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createPhotoModel } from "../model/service";

export default async function createPhoto(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/photo/:photographerCpf', {
        schema: {
            params: z.object({
                photographerCpf: z.string()
            }),
            body: z.object({
                url: z.string(),
                price: z.coerce.number()
            })
        },
    }, async (request) => {
        const { url, price } = request.body
        const { photographerCpf } = request.params

        try {
            const photo = await createPhotoModel({ url, price, photographerCpf })
            return { photo }
        } catch (err) {
            console.error(err)
            return {}
        }

    })
}
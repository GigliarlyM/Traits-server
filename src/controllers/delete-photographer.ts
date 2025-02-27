import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { deletePhotographerModel } from "../model/photographer";

export default async function deletePhotographer(app: FastifyInstance) {
    //@Todo: mudar o IdPppher
    app.withTypeProvider<ZodTypeProvider>().delete('/photographer/:cpfPhotographer', {
        schema: {
            params: z.object({
                cpfPhotographer: z.string()
            })
        },
    }, async (request) => {
        const { cpfPhotographer } = request.params

        await deletePhotographerModel(cpfPhotographer)

        return { status: 200 }
    })
}
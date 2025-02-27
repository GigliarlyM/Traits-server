import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteClientModel } from "../model/client";

export default async function deleteClient(app: FastifyInstance) {
    //@Todo: mudar o IdPppher
    app.withTypeProvider<ZodTypeProvider>().delete('/client/:cpfClient', {
        schema: {
            params: z.object({
                cpfClient: z.string()
            })
        },
    }, async (request) => {
        const { cpfClient } = request.params

        await deleteClientModel(cpfClient)

        return { status: 200 }
    })
}
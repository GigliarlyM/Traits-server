import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { readClientModelAll } from "../model/client";


export default async function getClientAll(app: FastifyInstance) {
    //@Todo: mudar o IdPppher
    app.withTypeProvider<ZodTypeProvider>().get('/client', {
    },async () => {
        const clients = await readClientModelAll()

        return { clients }
    })
}
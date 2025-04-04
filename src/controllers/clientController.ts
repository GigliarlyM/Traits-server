import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import Client from "../model/cliente";
import Artista from "../model/artista";

export const createClient = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post("/client", {
        schema: {
            body: z.object({
                nome: z.string().min(3).max(50),
                email: z.string().email(),
                senha: z.string().min(6)
            })
        }
    }, async (require, response) => {
        const credencial = require.body;

        console.log("Credenciais recebidas")
        console.log(credencial)

        try {
            const client = new Client(credencial)
            await client.save()

            console.log("Credenciais salvas")
            response.status(201)

            return { client }
        } catch (err) {
            console.log("Ja esta cadastrado")
            return { message: "Crendenciais invalidas ou dados ja cadastrados" }
        }
    })
}

export const getClient = (app: FastifyInstance) => {
    // estou pensando em colocar o email, ja que ele eh unico
    app.withTypeProvider<ZodTypeProvider>().get("/client/:email", {
        schema: {
            params: z.object({
                email: z.string()
            })
        }
    }, async (require, response) => {
        const { email } = require.params;

        const client = await Client.findOne({ email })

        return { client }
    })
}

export const deleteClient = (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete("/client/:email", {
        schema: {
            params: z.object({
                email: z.string()
            })
        }
    }, async (require, response) => {
        const { email } = require.params;
        const client = await Client.findOne({ email })
        if (!client) throw new Error("Client not found: " + email)

        if (client.artista != null || client.artista != undefined)
            await Artista.findOneAndDelete({ userName: client.artista })

        await Client.findByIdAndDelete(client.id)
        response.statusCode = 200;
        return { message: "Client deleted successfully" }
    })
}
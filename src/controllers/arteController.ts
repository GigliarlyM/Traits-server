import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import artistaModel from "../model/artista";
import arteModel from "../model/arte"

async function addArte(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().post('/art/artist/:userName', {
      schema: {
         params: z.object({
            userName: z.string()
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

async function getArteByArtist(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().get('/art/artist/:userName', {
      schema: {
         params: z.object({
            userName: z.string()
         })
      }
   }, async (request) => {
      const { userName } = request.params
      const artista = await artistaModel.findOne({ userName: userName })
      if (!artista) {
         throw new Error('Artista não encontrado')
      }

      // Buscandos artes relacionado com esse artista

      const artes = await arteModel.find({ _id: { $in: artista.artes } })

      return { userName, artes }
   })
}

async function getArte(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().get('/art/:id', {
      schema: {
         params: z.object({
            id: z.string()
         })
      }
   }, async (request) => {
      const { id } = request.params
      
      const arte = await arteModel.findById(id)

      return { arte }
   })
}

async function getArtes(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().get('/art', async () => {
      try {
         const artes = await arteModel.find();

         return { artes }
      } catch (error) {
         throw new Error('Erro ao buscar artes')
      }
   })
}

export {
   addArte,
   getArteByArtist,
   getArtes,
   getArte
}

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
      // para requisicoes sem permanencia de dados
      const artes = [{
         titulo: "z.string()",
         descricao: "z.string()",
         imagem: "https://wallpapers.com/images/hd/black-mazda-rx-7-with-purple-light-ymf3fmh6d9xevn5x.jpg",
         valor: 20,
         genero: "z.string()",
         artistas: []
      }, {
         titulo: "Teste de leve",
         descricao: "nothing of demais",
         imagem: "https://p.turbosquid.com/ts-thumb/Yk/Gyyjj0/C1ixv4DN/a/jpg/1311627327/600x600/fit_q87/a77447c3a36b93e84e5d586fdcaa421e619b39e0/a.jpg",
         valor: 40,
         genero: "Terror",
         artistas: []
      }, {
         titulo: "Teste 2",
         descricao: "nothing of demais",
         imagem: "https://wallpapers.com/images/hd/black-mazda-rx-7-with-purple-light-ymf3fmh6d9xevn5x.jpg",
         valor: 20,
         genero: "Terror",
         artistas: []
      }, {
         titulo: "Teste 3",
         descricao: "nothing of demais",
         imagem: "https://wallpapers.com/images/hd/black-mazda-rx-7-with-purple-light-ymf3fmh6d9xevn5x.jpg",
         valor: 20,
         genero: "Terror",
         artistas: []
      }]

      return { artes }
   })
}

export {
   addArte,
   getArteByArtist,
   getArtes,
   getArte
}

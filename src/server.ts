import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./env";
import jwt from "@fastify/jwt"

import "./config/db"

import createClient from "./controllers/create-client";
import createPhoto from "./controllers/create-photo";
import createPhotographer from "./controllers/create-photographer";
import deleteClient from "./controllers/delete-client";
import deletePhoto from "./controllers/delete-photo";
import deletePhotographer from "./controllers/delete-photographer";
import getClientAll from "./controllers/get-client";
import getClientUnique from "./controllers/get-client-unique";
import getPhoto from "./controllers/get-photo";
import getPhotoAll from "./controllers/get-photo-all";
import getPhotographer from "./controllers/get-photographer";
import postPromoPhoto from "./controllers/post-promo-photo";
import putClient from "./controllers/put-client";
import putPhotographer from "./controllers/put-photographer";
import validationClient from "./controllers/validation-client";
import validationPhotographer from "./controllers/validation-photographer";
import accessControllMiddleware from "./middleware/access-control-middleware";

const app = fastify()

app.register(cors, {
    origin: '*',
})

// config do fastify
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(jwt, {
    secret: env.SECRET
})

// middleware
app.addHook('onRequest', accessControllMiddleware)

// Crud do fotografo
app.register(createPhotographer)
app.register(getPhotographer)
app.register(putPhotographer)
app.register(deletePhotographer)

// Crud do Client
app.register(createClient)
app.register(getClientUnique)
app.register(getClientAll)
app.register(putClient)
app.register(deleteClient)

// CRUD do servico
app.register(createPhoto)
app.register(getPhoto)
app.register(postPromoPhoto)
app.register(deletePhoto)
app.register(getPhotoAll)

// Validation
app.register(validationClient)
app.register(validationPhotographer)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
})
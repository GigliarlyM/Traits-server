import cors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./src/env";
import jwt from "@fastify/jwt"

import "./config/db"


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
// app.addHook('onRequest', accessControllMiddleware)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
})
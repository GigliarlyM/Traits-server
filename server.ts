import cors from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./src/env";
import jwt from "@fastify/jwt"
import app from "./src/routes/geral"

import "./config/db"

app.register(cors, {
    origin: '*',
})

// config do fastify
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(jwt, {
    secret: env.SECRET
})


app.listen({ port: env.PORT }).then(() => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
})
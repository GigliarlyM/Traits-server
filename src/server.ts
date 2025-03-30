import cors from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { envTranformed } from "./env";
import jwt from "@fastify/jwt"
import app from "./routes/geral"

import "./config/db"
import { webSocketRoutes } from "./webSocket";

app.register(jwt, {
    secret: envTranformed.SECRET
})

app.register(cors, {
    origin: '*',
})


app.register(webSocketRoutes)


// config do fastify
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({ port: envTranformed.PORT }).then(() => {
    console.log(`Server listening on http://localhost:${envTranformed.PORT}`);
})
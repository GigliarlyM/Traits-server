import jwt from "@fastify/jwt";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import {
    addArte, getArte, getArtes
} from "./controllers/arteController";
import {
    createArtist, getArtist
} from "./controllers/artistController";
import { createClient, deleteClient, getClient } from "./controllers/clientController";
import login from "./controllers/login";
import { confirmPayment, createPayment } from "./controllers/paymentController";
import { envTranformed } from "./env";
import accessControllMiddleware from "./middleware/access-control-middleware";

import "./config/db";
import { webSocketRoutes } from "./webSocket";

const app = fastify()

// config do fastify
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// rota de login
app.register(login)

// cliente
app.register(createClient)
app.register(getClient)
app.register(deleteClient)

// operacoes de artista
app.register(createArtist)
app.register(getArtist)

// operacoes de arte
app.register(addArte)
app.register(getArte)
app.register(getArtes)

// pagamentos
app.register(createPayment)
app.register(confirmPayment)

app.addHook('onRequest', accessControllMiddleware)

app.register(jwt, {
    secret: envTranformed.SECRET
})

// Configuracao do socket
app.register(webSocketRoutes)

// esse host 0.0.0.0 permite que o fastify aceite conexoes externas
app.listen({ port: envTranformed.PORT, host: '0.0.0.0' }).then(() => {
    console.log(`Server listening on http://localhost:${envTranformed.PORT}`);
})
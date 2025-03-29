import fastify from "fastify";
import {
    createArtist, getArtist
} from "../controllers/artistController";
import {
    addArte, getArte, getArtes
} from "../controllers/arteController"
import accessControllMiddleware from "../middleware/access-control-middleware";
import { createClient, deleteClient, getClient } from "../controllers/clientController";
import { confirmPayment, createPayment } from "../controllers/paymentController";
import login from "../controllers/login";

const app = fastify()

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

export default app
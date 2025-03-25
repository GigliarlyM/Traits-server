import fastify from "fastify";
import {
    createArtista, deleteArtista, getArtista, updateArtista
} from "../controllers/artistaController";
import {
    addArte, getArte, getArtes
} from "../controllers/arteController"
import accessControllMiddleware from "../middleware/access-control-middleware";

const app = fastify()

// operacoes de artista
app.register(createArtista)
app.register(getArtista)
app.register(updateArtista)
app.register(deleteArtista)

// operacoes de arte
app.register(addArte)
app.register(getArte)
app.register(getArtes)

app.addHook('onRequest', accessControllMiddleware)

export default app
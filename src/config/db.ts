import mongoose from "mongoose";
import { env } from "../env";

mongoose.connect(env.MONGO_URI, {
    socketTimeoutMS: 30000,
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error(`Erro ao conectar ao MongoDB: ${err}`))

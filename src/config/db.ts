import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import { envTranformed } from "../env";

mongoose.connect(envTranformed.MONGO_URI, {
    socketTimeoutMS: 30000,
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(() => {
        console.error("Erro ao estabeler conexao local")
        console.log("Continuando com conexao online")
        const client = new MongoClient(envTranformed.MONGO_URI_ONLINE, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })

        client.connect().then(({ db }) => {
            db("Traits").command({ ping: 1 })
            console.log("Pinged your deployment. You successfully")
        })
        .catch(() => console.log("Erro ao conectar com o mongodb online"))
    })

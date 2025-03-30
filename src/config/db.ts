import mongoose from "mongoose";
import { envTranformed } from "../env";

async function run() {
    try {
        await mongoose.connect(envTranformed.MONGO_URI, {
            // socketTimeoutMS: 3000
        })

        console.log("Banco de dados local conectado -- 😀😀")
    } catch (err) {
        console.error("Erro ao estabelecer conexao")

        console.log('Conectando ao MongoDB Online')
        try {
            mongoose.connect(envTranformed.MONGO_URI_ONLINE, {
                // socketTimeoutMS: 3000,
                serverApi: { version: '1', strict: true }
            })
            await mongoose.connection.db?.admin().command({ ping: 1 })
        } catch (err) {
            console.error("Vixe !! ❌💥🫥")
        }
    }
}

run()
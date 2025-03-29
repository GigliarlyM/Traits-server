import mongoose from "mongoose";
import { envTranformed } from "../env";

async function run() {
    console.log('Conectado ao MongoDB Online')
    try {
        mongoose.connect(envTranformed.MONGO_URI_ONLINE, {
            socketTimeoutMS: 3000,
            serverApi: { version: '1', strict: true }
        })
        await mongoose.connection.db?.admin().command({ ping: 1 })
        console.log("Pinged your deployment. You successfully -- 😀😀")
    } catch (err) {
        console.error("Erro ao estabelecer conexao online")
        
        try {
            await mongoose.connect(envTranformed.MONGO_URI, { socketTimeoutMS: 3000 })

        } catch (err) {
            console.error("Vixe !! ❌💥🫥")
        }
    }
}

run()
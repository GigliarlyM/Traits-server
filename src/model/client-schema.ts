import mongoose from "mongoose";

const client = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    apelido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Client', client)
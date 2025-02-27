import mongoose from "mongoose";

const photographer = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    apelido: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    }
})

export default mongoose.model('Photographer', photographer)
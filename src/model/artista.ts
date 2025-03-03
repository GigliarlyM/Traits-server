import mongoose from "mongoose";

const artista = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
    userName: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    artes: [{ type: mongoose.Types.ObjectId, ref: "Arte" }]
})

export default mongoose.model('Artista', artista)
import mongoose from "mongoose";

const artista = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    // Vou colocar o email de cliente
    client: { type: String, required: true, ref: "Cliente" },
    artes: [{ type: mongoose.Types.ObjectId, ref: "Arte" }]
})

export default mongoose.model('Artista', artista)
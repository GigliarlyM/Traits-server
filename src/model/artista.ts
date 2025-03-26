import mongoose from "mongoose";

const artista = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    client: { type: mongoose.Types.ObjectId, required: true },
    artes: [{ type: mongoose.Types.ObjectId, ref: "Arte" }]
})

export default mongoose.model('Artista', artista)
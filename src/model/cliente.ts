import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nome: String,
    idade: Number,
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    // referencia a conta de artista SE o usuario possuir,
    // e caso possua, guardara o userName de artista
    artista: { type: String, ref: "Artista" },
    pagamentos: [{ type: mongoose.Types.ObjectId, ref: "Pagamentos" }]
})

export default mongoose.model('Cliente', schema)
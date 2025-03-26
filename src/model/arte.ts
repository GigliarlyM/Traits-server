import mongoose from "mongoose";

const arte = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String,
    imagem: String,
    valor: { type: Number, default: 0.0 },
    genero: String,
    desconto: Number,
    // relacao com artista, como userName
    // sera unico, entao vou coloca lo como referencia
    // lista de username de artista
    artistas: [{ type: String, ref: "Artista" }]
})

export default mongoose.model('Arte', arte)
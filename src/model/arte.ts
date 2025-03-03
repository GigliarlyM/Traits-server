import mongoose from "mongoose";

const arte = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String,
    imagem: String,
    valor: {type: Number, default: 0.0},
    genero: String,
    desconto: Number
})

export default mongoose.model('Arte', arte)
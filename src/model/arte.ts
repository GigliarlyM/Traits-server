import mongoose from "mongoose";

const arte = new mongoose.Schema({
    titulo: {type: String, required: true},
    blob: String,
    valor: Number,
    genero: String
})

export default mongoose.model('Arte', arte)
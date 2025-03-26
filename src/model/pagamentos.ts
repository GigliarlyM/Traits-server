import mongoose from "mongoose";

const schema = new mongoose.Schema({
    status: Boolean,
    quantidade: Number,
    valorItem: Number,
    formaPagamento: { type: String, default: "PIX" },
    quaisItens: [{ type: mongoose.Types.ObjectId }],
    // referencia o email do cliente que pediu
    cliente: { type: String, ref: "Cliente" },
})

export default mongoose.model('Pagamento', schema)
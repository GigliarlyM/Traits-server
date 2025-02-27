import mongoose from "mongoose";

const service = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    promo: {
        type: Number,
        required: true,
        default: 0
    },
    photographerCpf: {
        type: String,
        ref: 'Photographer',
        required: true
    }
})

export default mongoose.model('Service', service)
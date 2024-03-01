import mongoose from "mongoose";

const { Schema, model } = mongoose;

const packageSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    maxPeopole: {
        type: Number,
        required: true,
    },
    isCustom: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
    },
    servicesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

export default model("Package", packageSchema);
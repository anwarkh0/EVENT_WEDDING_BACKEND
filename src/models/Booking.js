import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    budget: {
        type: Number,
        required: true,
    },
  /*   status: {
        type: String,
        enum: ["", "", ""],
        required: true,
    }, */
    bookingDate: {
        type: String,
        required: true,
    },
    packagesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }],
    servicesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
});

export default model("Booking", bookingSchema);
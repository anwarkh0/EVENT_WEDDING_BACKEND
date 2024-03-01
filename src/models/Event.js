import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new mongoose.Schema({


  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  packageId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  serviceId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],

});

export default model("Event", eventSchema);
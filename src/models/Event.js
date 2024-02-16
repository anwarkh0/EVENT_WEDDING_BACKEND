import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("Event", userSchema);
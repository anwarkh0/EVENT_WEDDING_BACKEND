import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbconnect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to Database: ", error);
  }
}

export default dbconnect;

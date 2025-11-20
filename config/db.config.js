import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Db connected");
  } catch (err) {
    console.log("error", err);
  }
};

export default dbConnect;

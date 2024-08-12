import mongoose from "mongoose";

const DB_String = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose
      .connect(DB_String)
      .then(() => console.log(`Connected to database successfully`));
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;

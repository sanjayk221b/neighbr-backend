import mongoose from "mongoose";
import { loadEnv } from "@neighbr/common";
import { logger } from "@neighbr/common";

const { MONGO_URI } = loadEnv(["MONGO_URI"]);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("Connected to database successfully");
  } catch (error: any) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
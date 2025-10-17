import mongoose from "mongoose";
import { env } from "./environment.js";

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;
const serverSelectionTimeoutMS = 5000;

export const CONNECT_DB = async () => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await mongoose.connect(env.DB_MONGO, {
        serverSelectionTimeoutMS,
      });

      console.log("✅ MongoDB connected successfully!");
      return mongoose.connection;
    } catch (error) {
      console.error(
        `❌ MongoDB connection failed (attempt ${i + 1}/${MAX_RETRIES})`
      );

      if (i < MAX_RETRIES - 1) {
        console.log(`🔁 Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error("💥 All connection attempts failed!");
        throw error;
      }
    }
  }
};

import "dotenv/config";

export const env = {
  DB_MONGO: process.env.DB_MONGO,
  DB_NAME: process.env.DB_NAME,

  BUILD_MODE: process.env.BUILD_MODE,
  DEV_HOST: process.env.DEV_HOST,
  DEV_PORT: process.env.DEV_PORT,

  AUTHOR: process.env.AUTHOR,
};

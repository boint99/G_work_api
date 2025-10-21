import { env } from "~/config/environment"
import express from "express"
import { CONNECT_DB } from "~/config/db"
import { APIs_Route } from "~/routes"
import { errorHandler } from "~/middlewares/errorHandler"
import cors from 'cors'


const START_SERVER = async () => {
  const app = express()

  app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
  }))

  app.use(express.json())

  app.use('/', APIs_Route)

  app.use(errorHandler)

  app.listen(env.DEV_PORT, () => {
    console.log(`Start server successfully... `)
    console.log(`API_Route: ${env.DEV_HOST}:${env.DEV_PORT}`)
  });
};

(async () => {
  try {
    console.log("Connected to MongoDB Atlas!");
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})();

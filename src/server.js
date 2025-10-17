import { env } from "~/config/environment"
import express from "express"
import { CONNECT_DB } from "~/config/db"
import { APIs_Route } from "~/routes"

const app = express()

const START_SERVER = async () => {

  app.use('/', APIs_Route)

  app.listen(env.DEV_PORT, () => {
    console.log(`Start server successfully... `)
    console.log(`API_Route: ${env.DEV_HOST}:${env.DEV_PORT}/status`)
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

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { employeeRoute } from './employeeRoute/employeeRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs_Route are ready to use.' })
})

// user
Router.use('/user', employeeRoute )

export const APIs_Route = Router

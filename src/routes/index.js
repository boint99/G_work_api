import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute/userRoute'
import { employeeRoutes } from './employeeRoutes/employeeRoutes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs_Route are ready to use.' })
})

// user
Router.use('/user', userRoute )

// employee
Router.use('/', employeeRoutes )

export const APIs_Route = Router

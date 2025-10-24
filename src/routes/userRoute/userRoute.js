import express from 'express'
import { userValidation } from '~/validation/userValidation'
import { userController } from '~/function/users/userController'

const Router = express.Router()

Router.route('/register')
  .post(userValidation.register, userController.register)

Router.route('/login')
  .post(userValidation.login, userController.login)

export const userRoute = Router
import express from 'express'
import { employeeValidation } from '~/validation/employeeValidation'
import { employeeController } from '~/function/employee/employeeController'

const Router = express.Router()

Router.route('/register')
  .post(employeeValidation.register, employeeController.register)

Router.route('/login')
  .post(employeeValidation.login, employeeController.login)


export const employeeRoute = Router
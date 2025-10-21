import express from 'express'
import { employeeValidation } from '~/validation/employeeValidation'
import { employeeController } from '~/function/employee/employeeController'

const Router = express.Router()

Router.route('/register')
  .post(employeeValidation.register, employeeController.register)

export const employeeRoute = Router
import express from 'express'
import { employeeValidation } from '~/validation/employeeValidation'
import { employeeController } from '~/function/employees/employeeController'

const Router = express.Router()

Router.route('/employee')
  .post(employeeValidation.createEmployee, employeeController.createEmployee)


export const employeeRoutes = Router
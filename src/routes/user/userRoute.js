import express from 'express'
import employeeValidation from '~/validation/employeeValidation'
import employeeController from '~/function/employeeModel/employeeController'

const Router = express.Router()

Router.route('/register')
  .post(employeeValidation.register, employeeController.register)

  export const userRoute = Router
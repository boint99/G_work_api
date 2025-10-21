import { employee } from '~/function/employee/employeeModel'
import bcrypt from 'bcrypt'
import ApiError from '~/ulties/apiError'
import { StatusCodes } from 'http-status-codes'

const register = async ({ email, password, fullName }) => {
  const existingEmployee = await employee.findOneByEmail({ email })
  if (existingEmployee) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newEmployee = await employee.create({ email, password: hashedPassword, fullName })

  const result = newEmployee.toObject()
  delete result.password
  return result
}

export const employeeService = {
   register
}

import { employeeModel } from '~/function/employees/employeeModel'
import ApiError from '~/ulties/apiError'
import { StatusCodes } from 'http-status-codes'

const createEmployee = async (data) => {
  try {
    const existing = await employeeModel.findOneByEmail(data.employeeCode)

    if (existing) {
      throw new ApiError(StatusCodes.CONFLICT, 'Employee code or email already exists')
    }

    const createdEmployee = await employeeModel.employee.create(data)

    const result = createdEmployee.toObject()

    return result
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
    }

    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
}

export const employeeService = {
  createEmployee
}

import { StatusCodes } from 'http-status-codes'
import { employeeService } from './employeeSerives'

const createEmployee = async (req, res, next) => {
  try {

    const result = await employeeService.createEmployee(req.body)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const employeeController = {
  createEmployee
}

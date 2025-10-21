import { StatusCodes } from "http-status-codes"
import { employeeService } from "~/function/employee/employeeSerivces"

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body

    const newUser = await employeeService.register({ email, password, fullName })

    // Trả về kết quả
    res.status(StatusCodes.CREATED).json({
      message: "Register is Successfully!",
      data: newUser
    })
  } catch (error) {
    next(error)
  }
}

export const employeeController = {
  register
}

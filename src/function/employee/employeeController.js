import { StatusCodes } from "http-status-codes"
import { employeeService } from "~/function/employee/employeeSerivces"

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body

    const newUser = await employeeService.register({ email, password, fullName })
    console.log("🚀 ~ register ~ newUser:", newUser)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "Register is Successfully!",
      data: newUser
    })
  } catch (error) {
    next(error)
    // throw new Error ('employeeController')
  }
}

export const employeeController = {
  register
}

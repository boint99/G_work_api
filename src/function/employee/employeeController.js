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
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email and password required'
      })
    }

    const result = await employeeService.login({ email, password })

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const employeeController = {
  register,
  login
}

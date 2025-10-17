import { StatusCodes } from "http-status-codes"
import { userService } from "~/services/userService"

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body

    const newUser = await userService.register({ email, password, fullName })

    // Trả về kết quả
    res.status(StatusCodes.CREATED).json({
      message: "Đăng ký thành công!",
      data: newUser
    })
  } catch (error) {
    next(error)
  }
}

export const employeeController = {
  register
}

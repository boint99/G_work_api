import { StatusCodes } from 'http-status-codes'
import { userService } from '~/function/users/userSerivces'


const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body

    const newUser = await userService.register({ email, password, fullName })

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: 'Register is Successfully!',
      data: newUser
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email and password required'
      })
    }

    const result = await userService.login({ email, password })

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  register,
  login
}

import { userModel } from '~/function/users/userModel'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiError from '~/ulties/apiError'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { employeeModel } from '../employees/employeeModel'

const register = async ({ email, password, fullName }) => {
  // const getUsername = email.split('@')[0]

  // Check if email exists
  const existUser = await userModel.User.findOne({ email })

  if (existUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  let employee = await employeeModel.employee.findOne({ emailCompany: email })

  if (!employee) {
    employee = await employeeModel.employee.create({
      emailCompany: email,
      fullName,
      employeeCode: `EMP${Date.now()}`
    })
  }


  const newUser = await userModel.User.create({
    email,
    password: hashedPassword,
    fullName,
    employeeId: employee._id
  })

  const userResponse = newUser.toObject()
  delete userResponse.password

  return userResponse
}

export const login = async ({ email, password }) => {
  const existedUser = await userModel.findOneByEmail({ email })
  if (!existedUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Email does not exist')
  }

  const isMatch = await bcrypt.compare(password, existedUser.password)
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')
  }

  const token = JWT.sign(
    { userId: existedUser._id, email: existedUser.email },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    message: 'Login successfully',
    token,
    user: {
      id: existedUser._id,
      name: existedUser.name,
      email: existedUser.email
    }
  }
}

export const userService = {
  register,
  login
}

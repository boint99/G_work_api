import { employeeModel } from '~/function/employee/employeeModel'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiError from '~/ulties/apiError'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

const register = async ({ email, password, fullName }) => {

  const getUsername = email.split('@')[0]

  const existingEmployee = await employeeModel.findOneByEmail( email )

  if (existingEmployee) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newEmployee = await employeeModel.Employee.create({
    email,
    password: hashedPassword,
    fullName,
    userName: getUsername
  })


  const result = newEmployee.toObject()
  delete result.password
  return result
}

export const login = async ({ email, password }) => {
  const existedUser = await employeeModel.findOneByEmail({ email })
  console.log('🚀 ~ login ~ existedUser:', existedUser)
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

export const employeeService = {
  register,
  login
}

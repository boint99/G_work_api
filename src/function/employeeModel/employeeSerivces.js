import { User } from "~/models/userModel"
import bcrypt from "bcrypt"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"

const register = async ({ email, password, fullName }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, "Mail already exists!")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    fullName
  })

  // Ẩn password khi trả về client
  const userResponse = newUser.toObject()
  delete userResponse.password

  return userResponse
}

export const userService = {
  register
}

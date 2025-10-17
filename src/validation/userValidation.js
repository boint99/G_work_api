import Joi from "joi"
import { StatusCodes } from "http-status-codes"
import ApiError from "~/ulties/ApiError"


const register = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ"
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "Mật khẩu không được để trống",
      "string.pattern.base": "Mật khẩu chỉ chứa chữ và số, độ dài 3–30 ký tự"
    })
})

try {
  await schema.validateAsync(req.body, { abortEarly: false })
  next()
} catch (error) {
  const errorMessage = error.details.map(err => err.message).join(", ")
  const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
  next(customError)
}


const Login = async (req, res, next) => {

  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email không được để trống",
      "string.email": "Email không hợp lệ"
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.pattern.base": "Mật khẩu chỉ chứa chữ và số, độ dài 3–30 ký tự"
      })
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })

    next()
  } catch (error) {
    const errorMessage = error.details.map(err => err.message).join(", ")

    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const employeeValidation = {
    Login,
    register
}
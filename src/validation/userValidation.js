import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/ulties/apiError'

const register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
      .required()
      .required()
      .messages({
        'string.empty': 'Password cannot be empty',
        'string.pattern.base': 'Password must contain only letters and numbers (3–30 characters)',
        'any.required': 'Password is required'
      }),
    fullName: Joi.string().trim().required().messages({
      'string.empty': 'Full name cannot be empty',
      'any.required': 'Full name is required'
    })
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.details.map(err => err.message).join(', ')))
  }
}

const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
      .required()
      .required()
      .messages({
        'string.empty': 'Password cannot be empty',
        'string.pattern.base': 'Password must contain only letters and numbers (3–30 characters)',
        'any.required': 'Password is required'
      })
  })

  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.details.map(err => err.message).join(', ')))
  }
}

export const userValidation = {
  login,
  register
}

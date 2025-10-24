import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/ulties/apiError'

const createEmployee = async (req, res, next) => {
  const schema = Joi.object({
    employeeCode: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Employee code is required',
        'string.empty': 'Employee code cannot be empty'
      }),

    fullName: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Full name is required'
      }),

    workEmail: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .allow(null, '')
      .messages({
        'string.email': 'Invalid email format'
      }),
    phone: Joi.string()
      .trim()
      .pattern(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
      .messages({
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Invalid Vietnamese phone number format'
      }),
    department: Joi.string().trim().allow(null, ''),
    position: Joi.string().trim().allow(null, ''),

    branch: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': 'Branch is required',
        'string.empty': 'Branch cannot be empty'
      })
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const message = error.details.map(err => err.message).join(', ')
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, message))
  }
}

export const employeeValidation = {
  createEmployee
}

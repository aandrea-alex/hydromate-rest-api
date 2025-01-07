import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/index.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name must be at least 3 characters long',
    'string.max':
      'Contact name must be less than or equal to 20 characters long',
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Invalid email format',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'Favourite status must be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...Object.values(CONTACT_TYPE))
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.required': 'Contact type is required',
      'any.only': `Contact type must be one of ${Object.values(
        CONTACT_TYPE,
      ).join(', ')}`,
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name must be at least 3 characters long',
    'string.max':
      'Contact name must be less than or equal to 20 characters long',
  }),
  phoneNumber: Joi.string().messages({
    'string.base': 'Phone number should be a string',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Invalid email format',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite status must be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...Object.values(CONTACT_TYPE))
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': `Contact type must be one of ${Object.values(
        CONTACT_TYPE,
      ).join(', ')}`,
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be updated',
  });

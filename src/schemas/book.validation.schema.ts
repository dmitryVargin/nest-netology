import * as Joi from 'joi';

export const bookValidationSchema = Joi.object().keys({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  authors: Joi.string().min(2).optional(),
  favorite: Joi.string().optional(),
  fileCover: Joi.string().optional(),
  fileName: Joi.string().optional(),
  fileBook: Joi.string().optional(),
  messages: Joi.string().optional(),
});

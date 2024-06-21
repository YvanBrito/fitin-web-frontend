import Joi from 'joi'

export const signUpSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Nome de usuário não pode ser um campo vazio',
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .messages({
      'string.empty': 'Senha não pode ser um campo vazio',
      'string.pattern.base':
        'Senha deve conter entre 3 e 30 caracteres alfanuméricos',
    }),
  passwordrepeat: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .messages({
      'string.empty': 'Senha não pode ser um campo vazio',
      'string.pattern.base':
        'Senha deve conter entre 3 e 30 caracteres alfanuméricos',
    }),
  name: Joi.string().required().messages({
    'string.empty': 'Nome não pode ser um campo vazio',
  }),
  birthdate: Joi.string().required().messages({
    'string.empty': 'Data de nascimento não pode ser um campo vazio',
  }),
  document: Joi.string().required().messages({
    'string.empty': 'Documento não pode ser um campo vazio',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Número de telefone não pode ser um campo vazio',
  }),
})

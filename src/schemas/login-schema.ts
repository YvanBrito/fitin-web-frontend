import Joi from 'joi'

export const loginSchema = Joi.object({
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
})

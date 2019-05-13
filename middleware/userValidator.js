const Joi = require('@hapi/joi')

module.exports = userValidator = user => {
  const regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)).{8,100}/

  const schema = ({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().regex(regex).required().error(() => {
      return `Password must contain 8-100 characters, with at least one 
      lowercase letter, one uppercase letter, one number, and one special character.`
    })
  })

  return Joi.validate(user, schema)
}
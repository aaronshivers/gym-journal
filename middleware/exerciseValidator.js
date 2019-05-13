const Joi = require('joi')

module.exports = exerciseValidator = exercise => {

  const schema = ({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required()
  })

  return Joi.validate(exercise, schema)
}

const Joi = require('joi');

module.exports.joiRecipieSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().required(),
  tags: Joi.array(),
  likes: Joi.number(),
});

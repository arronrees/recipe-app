const Joi = require('joi');

module.exports.joiRecipieSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string().lowercase()).required(),
  categories: Joi.array().items(Joi.string().lowercase()),
  likes: Joi.number(),
});

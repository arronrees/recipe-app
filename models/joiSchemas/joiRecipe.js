const Joi = require('joi');

module.exports.joiRecipeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  categories: Joi.array().items(Joi.string()),
  likes: Joi.number(),
});

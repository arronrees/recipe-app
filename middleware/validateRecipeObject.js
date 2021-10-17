const { joiRecipeSchema } = require('../models/joiSchemas/joiRecipe');

module.exports.validateRecipeObject = (req, res, next) => {
  const { body } = req;

  const { error } = joiRecipeSchema.validate(body);

  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    console.log(msg);
    throw new Error(msg);
  } else {
    console.log('Recipe object valid');
    next();
  }
};

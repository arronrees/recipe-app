const Recipe = require('../models/Recipe');
const { joiRecipeSchema } = require('../models/joiSchemas/joiRecipe');

module.exports.validateRecipe = (req, res, next) => {
  const { body } = req;

  const { error } = joiRecipeSchema.validate(body);

  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    console.log(msg);
    throw new Error();
  } else {
    console.log('Recipe valid');
    next();
  }
};

module.exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({});

  res.json(recipes);
};

module.exports.getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById(id);

  res.json(recipe);
};

module.exports.getCategoryRecipes = async (req, res) => {
  const { id } = req.params;
  const lowerId = id.toLowerCase();

  const recipes = await Recipe.find({ categories: lowerId });

  res.json(recipes);
};

module.exports.postNewRecipe = async (req, res) => {
  const { body } = req;

  const newRecipe = new Recipe(body);
  await newRecipe.save();

  res.json(newRecipe);
};

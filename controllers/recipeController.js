const Recipe = require('../models/Recipe');

const { handleRecipeErrors } = require('../utils/handleErrors');

module.exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(404).json(errors);
  }
};

module.exports.getSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id });

    res.status(200).json(recipe);
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(errors.statusCode).json(errors);
  }
};

module.exports.getCategoryRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const lowerId = id.toLowerCase();

    const recipes = await Recipe.find({ categories: lowerId });
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports.postNewRecipe = async (req, res) => {
  const { body } = req;

  const newRecipe = new Recipe(body);
  await newRecipe.save();

  res.status(201).json(newRecipe);
};

module.exports.putUpdateRecipe = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedRecipe = await Recipe.updateOne({ _id: id }, body);

  res.status(201).json(updatedRecipe);
};

module.exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const deletedRecipe = await Recipe.deleteOne({ _id: id });

  res.status(200).json(deletedRecipe);
};

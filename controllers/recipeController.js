const Recipe = require('../models/Recipe');
const User = require('../models/User');

const { handleRecipeErrors } = require('../utils/handleErrors');

module.exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate('user', 'username');
    recipes.reverse();

    res.status(200).render('home', { recipes });
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(errors.statusCode).render('404');
  }
};

module.exports.getSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id }).populate(
      'user',
      'username'
    );

    let recipeLiked = { liked: false };
    let currentUser = { recipe: false };

    const user = res.locals.user;

    if (user) {
      user.likedRecipes.forEach((r) => {
        if (r._id.toString() === id) {
          recipeLiked.liked = true;
        }
      });

      if (recipe.user._id.toString() === user._id.toString()) {
        currentUser.recipe = true;
      }
    }

    res
      .status(200)
      .render('recipes/recipe', { recipe, recipeLiked, currentUser });
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(errors.statusCode).render('404');
  }
};

module.exports.getCategoryRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const lowerId = id.toLowerCase();

    const recipes = await Recipe.find({ categories: lowerId });
    recipes.reverse();

    res.status(200).render('recipes/categories', { recipes });
  } catch (err) {
    const errors = handleRecipeErrors(err);
    res.status(errors.statusCode).render('404');
  }
};

module.exports.getUserRecipes = async (req, res) => {
  const { id } = req.params;
  const recipes = await Recipe.find({ user: id }).populate('user', 'username');
  recipes.reverse();

  res.render('recipes/user-recipes', { recipes });
};

module.exports.getNewRecipe = async (req, res) => {
  res.render('recipes/new');
};

module.exports.postNewRecipe = async (req, res) => {
  const { body } = req;

  const newRecipe = await Recipe.create(body);

  res.status(201).json(newRecipe);
};

module.exports.putUpdateRecipe = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedRecipe = await Recipe.updateOne({ _id: id }, body);

  res.status(201).json(updatedRecipe);
};

module.exports.putUpdateRecipeLikes = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  let alreadyLiked = false;

  const user = await User.findById(userId).populate('likedRecipes');

  user.likedRecipes.forEach((r) => {
    if (r._id.toString() === id) {
      alreadyLiked = true;
    }
  });

  if (alreadyLiked) {
    const recipe = await Recipe.findById(id);
    recipe.likes = recipe.likes - 1;
    await recipe.save();

    const likedRecipes = user.likedRecipes;

    for (let i = 0; i < likedRecipes.length; i++) {
      if (likedRecipes[i]._id.toString() === id) {
        likedRecipes.splice(i, 1);
      }
    }
    await user.save();
  } else {
    const recipe = await Recipe.findById(id);
    recipe.likes = recipe.likes + 1;
    await recipe.save();

    user.likedRecipes.push(id);
    await user.save();
  }

  res.json({ success: true });
};

module.exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const deletedRecipe = await Recipe.deleteOne({ _id: id });

  console.log(deletedRecipe);

  res.status(200).json(deletedRecipe);
};

const { Router } = require('express');

const recipeController = require('../controllers/recipeController');

const router = Router();

router.get('/recipes', recipeController.getAllRecipes);

router.get('/recipes/:id', recipeController.getSingleRecipe);

router.get('/recipes/categories/:id', recipeController.getCategoryRecipes);

router.post(
  '/recipes/new',
  recipeController.validateRecipe,
  recipeController.postNewRecipe
);

module.exports = router;

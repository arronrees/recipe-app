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

router.put(
  '/recipes/update/:id',
  recipeController.validateRecipe,
  recipeController.updateRecipe
);

router.delete('/recipes/delete/:id', recipeController.deleteRecipe);

module.exports = router;

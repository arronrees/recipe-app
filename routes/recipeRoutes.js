const { Router } = require('express');

const recipeController = require('../controllers/recipeController');
const { validateRecipeObject } = require('../middleware/validateRecipeObject');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

const router = Router();

router.get('/recipes', recipeController.getAllRecipes);

router.get(
  '/recipes/new',
  checkLoggedInRedirect,
  recipeController.getNewRecipe
);

router.get('/recipes/:id', recipeController.getSingleRecipe);

router.get('/recipes/categories/:id', recipeController.getCategoryRecipes);

router.get('/recipes/users/:id', recipeController.getUserRecipes);

router.post(
  '/recipes/new',
  validateRecipeObject,
  recipeController.postNewRecipe
);

router.put(
  '/recipes/update/:id',
  validateRecipeObject,
  recipeController.putUpdateRecipe
);

router.put('/recipes/update-likes/:id', recipeController.putUpdateRecipeLikes);

router.delete('/recipes/delete/:id', recipeController.deleteRecipe);

module.exports = router;

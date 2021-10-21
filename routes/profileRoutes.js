const { Router } = require('express');

const profileController = require('../controllers/profileController');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

const router = Router();

router.get('/profile', checkLoggedInRedirect, profileController.getProfile);

router.get(
  '/profile/saved-recipes',
  checkLoggedInRedirect,
  profileController.getProfileLikedRecipes
);

router.get(
  '/profile/my-recipes',
  checkLoggedInRedirect,
  profileController.getMyRecipes
);

module.exports = router;

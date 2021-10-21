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

module.exports = router;

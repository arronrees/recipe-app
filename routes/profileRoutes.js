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

router.get(
  '/profile/update-details',
  checkLoggedInRedirect,
  profileController.getUpdateDetails
);

router.get(
  '/profile/update-password',
  checkLoggedInRedirect,
  profileController.getUpdatePassword
);

router.get(
  '/profile/delete-account',
  checkLoggedInRedirect,
  profileController.getDeleteAccount
);

module.exports = router;

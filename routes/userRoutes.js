const { Router } = require('express');

const userController = require('../controllers/userController');
const { validateUserObject } = require('../middleware/validateUserObject');
const { validatePassword } = require('../middleware/validatePassword');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

const router = Router();

router.get('/sign-up', checkLoggedInRedirect, userController.getSignUp);

router.get('/log-in', checkLoggedInRedirect, userController.getLogIn);

router.post('/user/sign-up', validateUserObject, userController.postNewSignUp);

router.post('/user/log-in', userController.postLogin);

router.post('/user/sign-out', userController.postSignOut);

router.put(
  '/user/update-details/:id',
  validateUserObject,
  userController.putUpdateUserDetails
);

router.put(
  '/user/update-password/:id',
  validatePassword,
  userController.putUpdateUserPassword
);

router.delete('/user/:id', userController.deleteUser);

router.get('/users', userController.getAllUsers);

module.exports = router;

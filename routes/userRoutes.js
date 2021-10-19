const { Router } = require('express');

const userController = require('../controllers/userController');
const { validateUserObject } = require('../middleware/validateUserObject');
const { validatePassword } = require('../middleware/validatePassword');
const { checkLoggedIn } = require('../middleware/authMiddleware');

const router = Router();

router.get('/sign-up', checkLoggedIn, userController.getSignUp);

router.get('/log-in', checkLoggedIn, userController.getLogIn);

router.post('/user/sign-up', validateUserObject, userController.postNewSignUp);

router.post('/user/log-in', userController.postLogin);

router.put('/user/update-details/:id', userController.putUpdateUserDetails);

router.put(
  '/user/update-password/:id',
  validatePassword,
  userController.putUpdateUserPassword
);

router.get('/users', userController.getAllUsers);

module.exports = router;

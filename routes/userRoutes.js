const { Router } = require('express');

const userController = require('../controllers/userController');
const { validateUserObject } = require('../middleware/validateUserObject');
const { validatePassword } = require('../middleware/validatePassword');

const router = Router();

router.get('/sign-up', userController.getSignUp);

router.get('/log-in', userController.getLogIn);

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

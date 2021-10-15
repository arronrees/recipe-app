const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/user/sign-up',
  userController.validateUserObject,
  userController.postNewSignUp
);

router.post('/user/log-in', userController.postLogin);

router.put('/user/update-details/:id', userController.putUpdateUserDetails);

router.put(
  '/user/update-password/:id',
  userController.validatePassword,
  userController.putUpdateUserPassword
);

router.get('/users', userController.getAllUsers);

module.exports = router;

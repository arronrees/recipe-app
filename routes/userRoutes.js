const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/sign-up',
  userController.validateUserObject,
  userController.postNewSignUp
);

router.post('/log-in', userController.postLogin);

module.exports = router;

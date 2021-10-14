const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/sign-up',
  userController.validateUser,
  userController.postNewSignUp
);

module.exports = router;

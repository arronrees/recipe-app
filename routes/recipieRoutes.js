const { Router } = require('express');

const recipieController = require('../controllers/recipieController');

const router = Router();

router.get('/', recipieController.getAllRecipies);

module.exports = router;

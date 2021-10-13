const { Router } = require('express');

const recipieController = require('../controllers/recipieController');

const router = Router();

router.get('/recipies', recipieController.getAllRecipies);

router.get('/recipies/:id', recipieController.getSingleRecipie);

module.exports = router;

const { Router } = require('express');

const profileController = require('../controllers/profileController');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

const router = Router();

router.get('/profile', checkLoggedInRedirect, profileController.getProfile);

module.exports = router;

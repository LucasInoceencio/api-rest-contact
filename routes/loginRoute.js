const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');
const auth = require('../lib/auth');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', auth.verifyLoggedUser, controller.logout);

module.exports = router;
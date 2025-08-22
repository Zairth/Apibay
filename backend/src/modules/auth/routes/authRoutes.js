const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validateUserLogin = require('../middlewares/validateUserLogin');

router.post('/login', validateUserLogin, authController.login);

module.exports = router;

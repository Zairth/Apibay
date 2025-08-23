const express = require('express');
const router = express.Router();

const login = require('../controllers/authController');
const validateUserLogin = require('../middlewares/validateUserLogin');

router.post('/login', validateUserLogin, login);

module.exports = router;

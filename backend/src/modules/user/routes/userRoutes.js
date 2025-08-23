const express = require('express');
const { register, getUsers } = require('../controllers/userController');
const validateRegister = require('../middlewares/validateRegister');
const isAdmin = require('../../../middlewares/isAdmin');
const verifyToken = require('../../../middlewares/verifyToken');

const router = express.Router();

// POST /users -> créer un user
router.post('/', validateRegister, register);

// GET /users -> récupérer tous les users
router.get('/', verifyToken, isAdmin, getUsers);

module.exports = router;

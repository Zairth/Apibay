const express = require('express');
const { register, getUsers } = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// POST /users -> créer un user
router.post('/', validateUser, register);

// GET /users -> récupérer tous les users
router.get('/', isAdmin, getUsers);

module.exports = router;

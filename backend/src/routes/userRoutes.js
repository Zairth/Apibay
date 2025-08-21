const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

// POST /users -> créer un user
router.post('/', validateUser, createUser);

// GET /users -> récupérer tous les users
router.get('/', getUsers);

module.exports = router;

const express = require('express');

const { register, getUsers, updateUser } = require('../controllers/userController');

// Middlewares
const isAdmin = require('../../../middlewares/isAdmin');
const verifyToken = require('../../../middlewares/verifyToken');

const validateRegister = require('../middlewares/validateRegister');
const isHimselfOrAdmin = require('../middlewares/isHimselfOrAdmin');
const validateUpdate = require('../middlewares/validateUpdate');

const router = express.Router();

// POST /users -> créer un user
router.post('/', validateRegister, register);

// GET /users -> récupérer tous les users
router.get('/', verifyToken, isAdmin, getUsers);

// PUT /users/:id -> mettre à jour un user
router.put('/:id', verifyToken, isHimselfOrAdmin, validateUpdate, updateUser);

module.exports = router;

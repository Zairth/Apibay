
// ************************************************************************** //
// Séparation des responsabilités, ici configuration de l'application Express //
// ************************************************************************** //


const express = require('express');
const app = express();


const userRoutes = require('./modules/user/routes/userRoutes');
const authRoutes = require('./modules/auth/routes/authRoutes');

// Middlewares globaux
app.use(express.json());

// Routes de l'application
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

module.exports = app;


// ************************************************************************** //
// Séparation des responsabilités, ici configuration de l'application Express //
// ************************************************************************** //


const express = require('express');
const app = express();


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middlewares globaux
app.use(express.json());

// Routes users
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

module.exports = app;

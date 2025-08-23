const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();


// *********************** //
// Authentification Routes //
// *********************** //


// POST /login -> Login d'un utilisateur
// Middleware "validateUserLogin" appelé avant de Log un utilisateur"
module.exports = async (req, res) => {

  try {

    const user = req.user; // injecté par le middleware

    // Création du JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("Erreur authController.login:", err);
    res.status(500).json({ error: "Erreur lors de la génération du token." });
  }
};

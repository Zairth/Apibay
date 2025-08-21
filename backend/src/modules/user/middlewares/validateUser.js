const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ********************************************************************** //
// Middleware pour valider les données de l'utilisateur avant la création //
// ********************************************************************** //


module.exports = async (req, res, next) => {

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email et password requis.' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'email invalide' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' });
  }

  // Passe au controlleur (Vérification de l'unicité gérée dans l'errorHandler déclanché dans les controlleurs')
  next();
};

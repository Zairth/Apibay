const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ******************************************************** //
// Middleware pour traiter les données User à mettre à jour //
// ******************************************************** //


module.exports = async (req, res, next) => {

  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    const dataToUpdate = {};

    if (username !== undefined) {
      if (username.trim() === '') {
        return res.status(400).json({ error: "Le nom d'utilisateur ne peut pas être vide." }); 
      }
      if (username !== user.username) {
        dataToUpdate.username = username;
      }
    }

    if (req.body.hasOwnProperty('email')) {
      if (email.trim() === '' || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'email invalide' });
      }
      if (email !== user.email) {
        dataToUpdate.email = email;
      }
    }

    if (password) {
      const isNewPassword = !(await bcrypt.compare(password, user.password));
      if (isNewPassword) {
        if (password.length < 8) {
          return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
        }
        dataToUpdate.password = await bcrypt.hash(password, 10);
      }
    }

    req.dataToUpdate = dataToUpdate;
    req.currentUser = user;

    // Passe au controlleur
    next();

  } catch (err) {

    console.error("Erreur validateUpdate:", err);
    res.status(500).json({ error: "Erreur lors de la validation des données." });
  }
};

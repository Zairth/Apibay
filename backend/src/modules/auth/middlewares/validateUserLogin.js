const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();


// ********************************************* //
// Middleware pour vérifier les créds d'un login //
// ********************************************* //


module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    // 💡 On stocke le user dans req.user pour le controller
    req.user = user;

    // On passe au controlleur
    next();

  } catch (err) {

    console.error("Erreur validateUserLogin:", err);
    res.status(500).json({ error: "Erreur serveur pendant l'authentification." });
  }
};

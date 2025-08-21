const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();


// ***************** //
// CRUD Utilisateurs //
// ***************** //


// POST /users -> créer un utilisateur
// Middleware "validateUser" appelé avant de créer un utilisateur"
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ 
      data: { username, email, password: hashedPassword } 
    });

    res.status(201).json("Utilisateur créé avec succès.");

  } catch (error) {

    // Gère la contrainte d'unicité sur l'email et le nom d'utilisateur
    if (error.code === 'P2002') {
      const field = error.meta.target;
      return res.status(400).json({ error: `${field.includes('email') ? 'Email' : 'Nom d\'utilisateur'} déjà utilisé.` });
    }

    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création d\' un utilisateur.' });
  }
};


// GET /users -> récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

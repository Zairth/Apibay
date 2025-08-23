const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();


// ***************** //
// CRUD Utilisateurs //
// ***************** //


// POST /users -> créer un utilisateur
// Middleware "validateRegister" appelé avant d'arriver ici"
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ 
      data: { username, email, password: hashedPassword, role: "USER" } 
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


// PUT /users/:id -> mettre à jour un utilisateur
// Middlewares "verifyToken", "isHimselfOrAdmin", "validateUpdate" appelé avant d'arriver ici
exports.updateUser = async (req, res) => {

  const { id } = req.params;
  const dataToUpdate = req.dataToUpdate;
  const user = req.currentUser;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(200).json({ message: "Aucune modification à effectuer." });
  }

  try {

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json({ message: 'Utilisateur mis à jour.', user: updatedUser });

  } catch (err) {

    if (err.code === 'P2002') {
      const field = err.meta.target;
      return res.status(400).json({ error: `${field.includes('email') ? 'Email' : 'Nom d\'utilisateur'} déjà utilisé.` });
    }

    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};


// GET /users -> récupérer tous les utilisateurs
// Middlewares "verifyToken" et "isAdmin" appelés avant d'arriver ici
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

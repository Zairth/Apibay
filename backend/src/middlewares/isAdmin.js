const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// ************************************************************************************************ //
// Middleware pour vérifier le rôle d'un user, appelé à la suite du middleware global : verifyToken //
// ************************************************************************************************ //


module.exports = async (req, res, next) => {

  const userRole = req.user.role;
  if (!userRole || userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Accès refusé.' });
  }

  next();
};

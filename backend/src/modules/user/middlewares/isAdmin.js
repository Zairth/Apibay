const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// ****************************************** //
// Middleware pour vérifier le rôle d'un user //
// ****************************************** //


module.exports = async (req, res, next) => {

  const userId = req.user.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Accès refusé.' });
  }

  // Passe au controlleur
  next();
};

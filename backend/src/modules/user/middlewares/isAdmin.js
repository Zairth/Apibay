const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// ****************************************** //
// Middleware pour vérifier le rôle d'un user //
// ****************************************** //


module.exports = async (req, res, next) => {


  // Passe au controlleur
  next();
};

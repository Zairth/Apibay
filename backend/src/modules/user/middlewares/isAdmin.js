const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// ****************************************** //
// Middleware pour vérifier le rôle d'un user //
// ****************************************** //


module.exports = async (req, res, next) => {


  // Passe au controlleur (Vérification de l'unicité gérée dans l'errorHandler déclanché dans les controlleurs')
  next();
};

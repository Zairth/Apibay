

// ********************************************************************************************************* //
// Middleware pour vérifier que la requête PUT est bien destiné à celui qui l'envoie, ou envoyé par un Admin //
// ********************************************************************************************************* //


module.exports = async (req, res, next) => {

  if (!req.user || !req.user.userId || !req.user.role) {
    return res.status(401).json({ error: "Non authentifié." });
  }

  if (req.user.role === 'ADMIN') {
    return next();
  }

  const userId = req.user.userId; // Envoyé par le middleware verifyToken

  if (userId !== req.params.id) {
    return res.status(403).json({ error: "Accès refusé." });
  }

  // Passe au controlleur
  next();
};

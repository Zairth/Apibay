

// ************************************************************************** //
// Middleware de gestion des erreurs pour l'API Express //
// ************************************************************************** //


module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Contrainte d\'unicité déclanchée.' });
  }

  res.status(500).json({ error: 'Erreur interne du serveur.' });
};

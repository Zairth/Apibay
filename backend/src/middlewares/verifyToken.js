const jwt = require("jsonwebtoken");


// *********************************************** //
// Middleware pour vérifier le token JWT d'un User //
// *********************************************** //


module.exports = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token manquant." });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Token invalide." });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // injecte les infos du user dans la requête
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    // Passe au controlleur
    next();

  } catch (err) {

    console.error("Erreur JWT:", err);
    return res.status(403).json({ error: "Token invalide ou expiré." });
  }
};

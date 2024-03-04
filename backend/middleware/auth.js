const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    // Récupérer le token de l'en-tête
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifier si le token est présent
    if (token == null) {
        return res.sendStatus(401);
    }

    // Vérifier la validité du token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // Si le token est valide, ajouter l'utilisateur au contexte de la requête
        req.user = user;
        next();
    });
};

module.exports = verifyToken;

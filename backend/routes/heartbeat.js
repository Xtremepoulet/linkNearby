const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const User = require('../models/user.js');

router.post('/', authenticateToken, async (req, res) => {
    const email = req.body.email

    if (!email) {
        return res.status(400).send('Adresse e-mail manquante')
    }
    try {
        await User.findOneAndUpdate({ email: email.toLowerCase() }, {
            isConnected: true,
            lastHeartbeat: new Date()
        }, { new: true });

        res.status(200).send('Heartbeat reçu');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour du statut de connexion');
    }
});

module.exports = router;

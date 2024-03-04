var express = require('express');
var router = express.Router();
//Shema 
require('../models/connection');

//modules cheackBody
const { checkBody } = require('../modules/checkBody');

//Gestion mot de passe et token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Database
const User = require('../models/user');


router.post('/signin', async (req, res) => {
    if (!checkBody(req.body, ['email', 'hash'])) {
        return res.status(400).json({ result: false, message: 'Missing email or password' });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.hash, user.hash)) {

            // Génération du JWT
            const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            res.json({ result: true, token: token });
        } else {
            res.status(401).json({ result: false, message: 'Incorrect email or password' });
        }
    } catch (error) {
        res.status(500).json({ result: false, message: 'Internal server error' });
    }
});


module.exports = router;
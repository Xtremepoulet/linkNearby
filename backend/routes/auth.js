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
    if (!checkBody(req.body, ['email', 'password'])) {
        return res.status(400).json({ result: false, message: 'Missing email or password' });
    }


    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.hash)) {

            // Génération du JWT
            const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            console.log(token)
            res.json({ result: true, token: token });
        } else {
            res.status(401).json({ result: false, message: 'Incorrect email or password' });
        }
    } catch (error) {
        res.status(500).json({ result: false, message: 'Internal server error' });
    }
});

    

router.post('/signup', async (req, res, next) => {
    if (!checkBody(req.body, ['email', 'password'])) {
        return res.status(400).json({ result: false, message: 'Missing email or password' });
    }

    const { email, password } = req.body;
    
    try {
        const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        const user = await User.findOne({ email: email });

        //si le user email existe dans la base de donnée ou que le format n'est pas respecté 
        if (user || !password_regex.test(password) || !email_regex.test(email)) {
            return res.status(400).json({ result: false, message: 'user already exist' })
        } else {
            const hash = bcrypt.hashSync(password, 10);
            const new_user = new User({
                email,
                hash,
            })
            new_user.save().then((user) => {
                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
                res.json({ result: true, token: token });
            });
        }
    } catch {
        return res.status(500).json({ result: false, message: 'Internal server error' });
    }
});


module.exports = router;
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
const { authenticateToken } = require('../middleware/auth');


//coté front : ne créer un channel que si l'utilisateur distant est connecté 
//donc faire une route en database pour vérifier si l'utilisateur est connecté = récupére son status 



//route de création de channel entre deux utilisateurs
router.post('/create_channel', async (req, res, next) => {

    //on récupérer l'id de celui qui créer la discussion et l'Id de l'utilisateur distant avec qui on veut la créer 
    const {userId, distant_userId} = req.body;

    if(!checkBody(req.body, ['userId', 'distant_userId'])){
        return res.json({ result: false });
    }

    //on créer l'id du channel en concatenant les deux ID 
    const channelId = `${userId}${distant_userId}`; 
})


module.exports = router;
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
const Channels = require('../models/channel');
const { authenticateToken } = require('../middleware/auth');


//coté front : ne créer un channel que si l'utilisateur distant est connecté 
//donc faire une route en database pour vérifier si l'utilisateur est connecté = récupére son status 



//route de création de channel entre deux utilisateurs
router.post('/create_channel', authenticateToken,  async (req, res, next) => {

    if (req.user.userId) {
                //on récupérer l'id de celui qui créer la discussion et l'Id de l'utilisateur distant avec qui on veut la créer 
        const {distant_user_name, distant_user_email} = req.body;

        if(!checkBody(req.body, ['distant_user_name' ,'distant_user_email'])){
            return res.json({ result: false, message: 'Missing or invalid champs' });
        }

        const user = await User.findOne({ _id: req.user.userId });


        //on recherche si l'utilisateur distant existe bel et bien 
        const distant_user = await User.findOne({name: distant_user_name}, {email: distant_user_email});

        if(!distant_user){
            return res.json({ result : false, message: 'distant user not found' });
        }

 
        const channel = await Channels.findOne({ users: {$all: [user.id, distant_user.id]} })
        if(!channel){
            const new_channel = new Channels({
                users: [user.id, distant_user.id],
            })

            await new_channel.save();

            res.json({ result: true, message: 'channel created'})
        }else {
            res.json({ result: false, message: 'channel already exists'})
        }

    }
    //besoin d'authentifier le token pour récupérer l'ID de l'utilisateur qui envoie le message 
})





//this route allows us to get all the informations of the users 
router.get('/load_user_channel', authenticateToken, async (req, res, next) => {
    if(req.user.userId){
        try{
            const user = await User.findOne({ _id: req.user.userId });
            
            const channels = await Channels.find({ users: user._id });

            const users_id = channels.reduce((acc, channel) => {
                acc.push(...channel.users);//on peut dans l'accumulator tout les utilisateurs trouvé 
                return acc;
            }, []);

          
            //on retire chaque ID 
            const uniqueUserIds = [...new Set(users_id)];
      

            // Fetch user details for all unique user IDs
            const users = await User.find({ _id: { $in: uniqueUserIds } });


            // Send the user details to the frontend
            res.json({ result: true, users });

        }catch (error){
            return res.status(500).json({ result: false, message: 'Internal server error' });
        }
    }
})



 

//load the message for the users connected to the same channel 
router.post('/messages', authenticateToken, async(req, res, next) => {

    if(req.user.userId){
        try{
            
            if(!checkBody(req.body, ['distant_user_id'])){
                return res.json({ result: false, message: 'Missing or invalid champs' });
            }

            const { distant_user_id } = req.body;
            
            console.log(req.user.userId)

            const channel = await Channels.findOne({ users: { $all: [req.user.userId, distant_user_id]}}).populate('messages', 'message user_id CreatedAt')

            res.json({ result: true, messages: channel.messages })
            
            

        }catch(error){
            return res.status(500).json({ result: false, message: 'Internal server error' });
        }
    }
})



module.exports = router;
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
const Message = require('../models/messages')
const { authenticateToken } = require('../middleware/auth');


//coté front : ne créer un channel que si l'utilisateur distant est connecté 
//donc faire une route en database pour vérifier si l'utilisateur est connecté = récupére son status 



//route de création de channel entre deux utilisateurs
router.post('/create_channel', authenticateToken, async (req, res, next) => {

    if (req.user.userId) {
        //on récupérer l'id de celui qui créer la discussion et l'Id de l'utilisateur distant avec qui on veut la créer 
        const { distant_user_name, distant_user_email } = req.body;

        if (!checkBody(req.body, ['distant_user_name', 'distant_user_email'])) {
            return res.json({ result: false, message: 'Missing or invalid champs' });
        }

        const user = await User.findOne({ _id: req.user.userId });


        //on recherche si l'utilisateur distant existe bel et bien 
        const distant_user = await User.findOne({ name: distant_user_name }, { email: distant_user_email });

        if (!distant_user) {
            return res.json({ result: false, message: 'distant user not found' });
        }


        const channel = await Channels.findOne({ users: { $all: [user.id, distant_user.id] } })
        if (!channel) {
            const new_channel = new Channels({
                users: [user.id, distant_user.id],
            })

            await new_channel.save();

            res.json({ result: true, message: 'channel created' })
        } else {
            res.json({ result: false, message: 'channel already exists' })
        }

    }
    //besoin d'authentifier le token pour récupérer l'ID de l'utilisateur qui envoie le message 
})





//this route allows us to get all the informations of the users 
router.get('/load_user_channel', authenticateToken, async (req, res, next) => {
    if (req.user.userId) {
        try {
            const user = await User.findOne({ _id: req.user.userId });

            const channels = await Channels.find({ users: user._id });

            const channelLastMessages = await Promise.all(channels.map(async (channel) => {
                const lastMessage = await Message.findOne({ _id: { $in: channel.messages } }).sort({ createdAt: -1 });

                // Calculer le nombre de messages non lus dans le canal pour l'utilisateur actuel
                const unreadMessagesCount = await Message.countDocuments({
                    _id: { $in: channel.messages },
                    isRead: false,
                    user_id: { $ne: req.user.userId }
                });

                return { channel, lastMessage, unreadMessagesCount };
            }));

            // Retirer les IDs uniques pour obtenir les détails des utilisateurs
            const uniqueUserIds = [...new Set(channels.flatMap(channel => channel.users))];
            const users = await User.find({ _id: { $in: uniqueUserIds } });

            // Envoyer les détails des utilisateurs et les derniers messages de chaque canal au frontend
            res.json({ result: true, users, channelLastMessages });

        } catch (error) {
            return res.status(500).json({ result: false, message: 'Internal server error', error });
        }
    }
});






//load the message for the users connected to the same channel 
router.post('/messages', authenticateToken, async (req, res, next) => {

    if (req.user.userId) {
        try {

            if (!checkBody(req.body, ['distant_user_id'])) {
                return res.json({ result: false, message: 'Missing or invalid champs' });
            }

            const { distant_user_id } = req.body;

            console.log(req.user.userId)

            const channel = await Channels.findOne({ users: { $all: [req.user.userId, distant_user_id] } }).populate('messages', 'message user_id CreatedAt')

            res.json({ result: true, messages: channel.messages })



        } catch (error) {
            return res.status(500).json({ result: false, message: 'Internal server error' });
        }
    }
})



//post channel id 
//post user distant 
//update channel pour l'utilisateur distant  distant user message to true 
//mettre a true tout ce qui n'est pas egal au distant user id 

router.post('/update_notifications', authenticateToken, async (req, res, next) => {

    if (req.user.userId) {

        try {
            const { distant_user_id } = req.body;

            if (!checkBody(req.body, ['distant_user_id'])) {
                return res.json({ result: false, message: 'Missing or invalid champs' });
            }

            const user = await User.findOne({ _id: req.user.userId });
            const channel = await Channels.findOne({ users: { $all: [user.id, distant_user_id] } })

            const messages = await channel.populate('messages')



            for (const message of channel.messages) {
                if (message.user_id.toString() !== user.id) {
                    message.isRead = true;
                    await message.save();
                }
            }


            if (channel) {
                res.json({ result: true, message: messages.messages })
            } else {
                res.json({ result: false, error: 'missing or invalid channel' })
            }
        } catch (error) {
            return res.status(500).json({ result: false, message: 'Internal server error' });
        }
    }
})


module.exports = router;
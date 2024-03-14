require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');



//import des bases de données 
const Channels = require('./models/channel');
const Message = require('./models/messages');
const User = require('./models/user');


// Fonctions
const updateUserStatus = require('./modules/updateUserStatus');

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const heartbeatRouter = require('./routes/heartbeat');
const channelRouter = require('./routes/channel');
const { channel } = require('diagnostics_channel');

const app = express();

// Création du serveur
const server = http.createServer(app);
const io = socketIo(server); // Attachez Socket.IO au serveur HTTP


// Middlewares
app.use(cors());
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/heartbeat', heartbeatRouter);
app.use('/channel', channelRouter);


// Configuration de Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.query.token; // Récupérez le token JWT du handshake
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => { // Utilisez la clé secrète environnementale
        if (err) return next(new Error('Authentication error'));
        socket.userId = decoded.userId; // Stockez l'ID de l'utilisateur dans l'objet socket pour une utilisation ultérieure
        //decoded.userId correspond à l'id unique du token JWT de l'utilisateur
        next();
    });
});

io.on('connection', (socket) => {
    updateUserStatus(socket.userId, true)

    socket.on('disconnect', () => {
        updateUserStatus(socket.userId, false)
    });


    // Écouter les messages privés et les stocker en BDD

    socket.on('send private message', async (payload) => {
        const { token, distant_user_id, message } = payload;

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error("Erreur de vérification du token:", err);
                return;
            }

            const userId = decoded.userId;

            // Création du nouveau message
            const newMessage = new Message({
                user_id: userId,
                message: message,
            });
            await newMessage.save();

            // Trouver ou créer le canal de chat entre les deux utilisateurs
            let channel = await Channels.findOne({ users: { $all: [userId, distant_user_id] } });

            if (!channel) {
                // Si le canal n'existe pas, créez-en un nouveau
                channel = new Channels({
                    users: [userId, distant_user_id],
                    messages: [newMessage._id] // Inclure le nouveau message dans le canal
                });
            } else {
                // Si le canal existe, ajoutez le nouveau message à la liste des messages du canal
                channel.messages.push(newMessage._id);
            }

            // Sauvegarder les modifications apportées au canal
            await channel.save();

            const messageToEmit = {
                id: newMessage._id,
                user_id: userId,
                message: newMessage.message,
                toUserId: distant_user_id,  // ID de l'utilisateur destinataire
            };

            // Trouver le token de notification de l'appareil du destinataire
            const recipient = await User.findById(distant_user_id);
            if (recipient && recipient.tokenNotification) {
                sendPushNotification(recipient.tokenNotification, message, userId);
            }

            // Émettre le message à tous les clients sauf à l'expéditeur
            socket.broadcast.emit('message received', messageToEmit);
        });
    });
});

// Fonction pour envoyer une notification push
async function sendPushNotification(expoPushToken, message, senderId) {
    const messageBody = {
        to: expoPushToken,
        sound: 'default',
        title: 'Nouveau message',
        body: message,
        data: { senderId: senderId }, // Informations supplémentaires si nécessaire
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
    });
}




//Export de app et server Io
module.exports = { app, server };

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

const activeConnections = new Map();
io.on('connection', (socket) => {

    // Ajouter la connexion à la structure de suivi
    activeConnections.set(socket.userId, socket);

    // Authentifier et attribuer socket.userId
    socket.on('authenticate', ({ token }) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (!err) {
                socket.userId = decoded.userId;
                console.log(`Utilisateur ${socket.userId} authentifié.`);

                // Informer les autres utilisateurs de la connexion
                socket.broadcast.emit('userStatusChanged', { userId: socket.userId, isConnected: true });
                updateUserStatus(socket.userId, true) // Mettre à jour le statut de l'utilisateur dans la base de données
                // Écouter les messages privés
                socket.on('send private message', async (payload) => {
                    const { distant_user_id, message } = payload;
                    const newMessage = new Message({
                        user_id: socket.userId,
                        message: message,
                    });
                    await newMessage.save();

                    let channel = await Channels.findOne({ users: { $all: [socket.userId, distant_user_id] } });
                    if (!channel) {
                        channel = new Channels({ users: [socket.userId, distant_user_id], messages: [newMessage._id] });
                    } else {
                        channel.messages.push(newMessage._id);
                    }
                    await channel.save();

                    const messageToEmit = { id: newMessage._id, user_id: socket.userId, message: message, toUserId: distant_user_id };
                    socket.broadcast.emit('message received', messageToEmit);
                });
            } else {
                console.error("Erreur de vérification du token:", err);
            }
        });
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        if (socket.userId) {
            socket.broadcast.emit('userStatusChanged', { userId: socket.userId, isConnected: false });
            updateUserStatus(socket.userId, false)
            activeConnections.delete(socket.userId);
        }
    });
});








io.on('chat channel', (socket) => {
    console.log('connected to the right channel')
    socket.emit('chat channel', 'fuck off')
})



//Export de app et server Io
module.exports = { app, server };

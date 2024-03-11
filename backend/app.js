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

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    socket.on('heartbeat', () => {
        updateUserStatus(socket.userId, true); // Mettre à jour l'état de connexion de l'utilisateur comme connecté
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
        updateUserStatus(socket.userId, false); // Mettre à jour l'état de connexion de l'utilisateur comme déconnecté
    });
});

io.on('connection', (socket) => {
    // Écouter les messages privés et les stocker en BDD
    socket.on('send private message', async (payload) => {
        console.log(payload.message);

        // Trouver le canal de chat basé sur les utilisateurs impliqués
        const channel = await Channels.findOne({
            users: { $all: [socket.userId, payload.distant_user_id] }
        });

        if (channel) {
            // Créer et sauvegarder le nouveau message
            const new_message = new Message({
                user_id: socket.userId,
                message: payload.message,
            });
            await new_message.save();

            // Ajouter le message au canal et sauvegarder
            channel.messages.push(new_message._id);
            await channel.save();

            // Émettre le message aux autres clients
            socket.to(channel._id).emit('message received', { message: payload.message });
        }
    });
});





io.on('chat channel', (socket) => {
    console.log('connected to the right channel')
    socket.emit('chat channel', 'fuck off')
})



//Export de app et server Io
module.exports = { app, server };

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


// Fonctions
const updateUserStatus = require('./modules/updateUserStatus');

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const heartbeatRouter = require('./routes/heartbeat');

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


// Configuration de Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.query.token; // Récupérez le token JWT du handshake
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => { // Utilisez la clé secrète environnementale
        if (err) return next(new Error('Authentication error'));
        socket.userId = decoded.userId; // Stockez l'ID de l'utilisateur dans l'objet socket pour une utilisation ultérieure
        next();
    });
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Mettre à jour l'état de connexion de l'utilisateur dans la base de données
    updateUserStatus(socket.userId, true);
    socket.broadcast.emit('userStatusChanged', { userId: socket.userId, isConnected: true });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);

        // Mettre à jour l'état de connexion de l'utilisateur dans la base de données
        updateUserStatus(socket.userId, false);
        socket.broadcast.emit('userStatusChanged', { userId: socket.userId, isConnected: false });
    });

});



//Export de app et server Io
module.exports = { app, server };

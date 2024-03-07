require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const User = require('./models/user'); // Assurez-vous que le chemin est correct

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const heartbeatRouter = require('./routes/heartbeat');

// Middleware
const verifyToken = require('./middleware/auth');

const app = express();

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

// Fonction de vérification pour mettre à jour le statut isConnected
const updateUsersStatus = async () => {
    const THREE_MINUTES = 3 * 60 * 1000; // 3 minutes en millisecondes
    const threshold = new Date(new Date().getTime() - THREE_MINUTES);

    try {
        await User.updateMany(
            { lastHeartbeat: { $lt: threshold } },
            { $set: { isConnected: false } }
        );
    } catch (error) {
        console.error('Erreur lors de la mise à jour des utilisateurs déconnectés:', error);
    }
};

// Démarrer la tâche de vérification à intervalles réguliers
setInterval(updateUsersStatus, 60 * 1000); // Exécute cette fonction toutes les 60 secondes

module.exports = app;

// import { io } from 'socket.io-client';

// // Définissez l'URL de votre serveur Socket.IO pour les environnements de développement et de production
// const SERVER_URL_DEV = 'http://10.9.1.124:4000'; // URL de développement
// const SERVER_URL_PROD = 'https://votre-serveur-production.com'; // URL de production
// const URL = process.env.NODE_ENV === 'production' ? SERVER_URL_PROD : SERVER_URL_DEV;

// // Initialisation de la connexion Socket.IO avec les options pour React Native
// export const socket = io(URL, {
//     transports: ['websocket'],
//     query: { token }, // Envoyer le token JWT à travers le handshake
//     jsonp: false, // Important pour éviter les problèmes CORS en React Native
// });

// // Vous pouvez également configurer des écouteurs d'événements globaux ici si nécessaire

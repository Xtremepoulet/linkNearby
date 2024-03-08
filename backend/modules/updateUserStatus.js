// Création de la fonction qui met à jour le statut de connexion de l'utilisateur dans la base de données
const User = require('../models/user.js');

const updateUserStatus = async (userId, isConnected) => {
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    isConnected: isConnected,
                    lastHeartbeat: isConnected ? Date.now() : null // Mettez à jour lastHeartbeat uniquement si l'utilisateur est connecté
                }
            },
            { new: true } // Renvoie le document modifié
        );
        console.log(`Statut de connexion mis à jour pour l'utilisateur ${userId}`);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du statut de connexion pour l'utilisateur`, error);
    }
};

module.exports = updateUserStatus;
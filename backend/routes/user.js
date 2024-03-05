const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { checkBody } = require('../modules/checkBody');

const User = require('../models/user');

router.get('/authorisation', authenticateToken, (req, res, next) => {
    //si un userId est renvoyé par le middleware, alors l'authorisation est correct 
    if(req.user.userId){
        res.json({result: true})
    }
})


//quand on appel la route, ne pas oublier de passer le token en header 
router.post('/user_informations', authenticateToken, async (req, res, next) => {
    const { name, birthdate, passions, bio, latitude, longitude, gender } = req.body;
    
    if(!checkBody(req.body, ['name', 'birthdate', 'passions', 'bio', 'latitude', 'longitude', 'gender'])){
        return res.status(400).json({ result: false, message: 'Missing informations' });
    }

    try {    
        // If a userId is returned by the middleware, then the authorization is correct 
        if (req.user.userId) {
            const user = await User.findOne({ _id: req.user.userId });
            if (user) {
                const result = await User.updateOne(
                    { _id: req.user.userId },
                    { $set: { 
                        name: name, 
                        birthdate: '1990-01-01', 
                        gender: gender,
                        bio: bio, 
                        updatedAt: new Date(),
                    },
                    $push: { 
                        location: { 
                            latitude: latitude, // Sample latitude value
                            longitude: longitude // Sample longitude value
                        },
                        userPassion: passions,
                    },
                   
                    
                }
                    
                );
                res.json({ result: true });
            }
        }
    } catch (error) {
        return res.status(500).json({ result: false, message: 'Internal server error' });
    }
})



module.exports = router; 
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



router.post('/user_informations', authenticateToken, async (req, res, next) => {
    const { name, birthdate, passions, bio, latitude, longitude, gender } = req.body;
    
    if(!checkBody(req.body, ['name', 'birthdate', 'passions', 'bio', 'latitude', 'longitude', 'gender'])){
        return res.status(400).json({ result: false, message: 'Missing informations' });
    }

    try{    
        
        //si un userId est renvoyé par le middleware, alors l'authorisation est correct 
        if(req.user.userId){
            const user = await User.findOne({ _id: req.user.userId});
            if(user){
                
                const filter = { _id: req.user.userId };
                console.log(filter)
                const updateUser = {
                    $set: {
                      name: name,
                      birthdate: new Date(),
                      passions: ['velo'],
                      bio: 'biographie for test',
                      gender: 'dragon',
                    },
                  };

                  console.log(updateUser)
                  const result = await User.updateMany(filter, updateDoc);
                  res.json({ result: true});
            }
        }
        
    }catch{
        return res.status(500).json({ result: false, message: 'Internal server error' });
    }
})


module.exports = router; 
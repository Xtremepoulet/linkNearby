const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { checkBody } = require('../modules/checkBody');

const User = require('../models/user.js');
const Passion = require('../models/Passion.js');

//cloudinary import 
const cloudinary = require('cloudinary').v2;
//file system 
const fs = require('fs');
const uniqid = require('uniqid');

router.get('/authorisation', authenticateToken, (req, res, next) => {
    //si un userId est renvoyé par le middleware, alors l'authorisation est correct 
    if (req.user.userId) {
        res.json({ result: true })
    }
})


//quand on appel la route, ne pas oublier de passer le token en header 
router.post('/user_informations', authenticateToken, async (req, res, next) => {
    const { name, birthdate, passions, bio, latitude, longitude, gender } = req.body;
    let url = '';


    if (!checkBody(req.body, ['name', 'birthdate', 'passions', 'bio', 'latitude', 'longitude', 'gender'])) {
        return res.status(400).json({ result: false, message: 'Missing informations' });
    }   

    try {    
        if (req.user.userId) {
            const user = await User.findOne({ _id: req.user.userId });
            if (user) {                                
                const result = await User.updateOne(
                    { _id: req.user.userId },
                    {
                        $set: {
                            name: name,
                            birthdate: '1990-01-01',
                            gender: gender,
                            bio: bio,
                            updatedAt: new Date(),
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


//authenticate with token, understand why its not working
router.post('/upload_user_photo',authenticateToken,  async (req, res, next) => {    
    if (req.user.userId) {

        const user = await User.findOne({ _id: req.user.userId });
            if (user) {
                const photoPath = `./tmp/${uniqid()}.jpg`; 
                  
                const resultMove = await req.files.photoFromFront.mv(photoPath);
                
                let url = '';
                if(!resultMove) {
                    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
                    fs.unlinkSync(photoPath);
                    url = resultCloudinary.secure_url;

                    const result = await User.updateOne(
                        { _id: req.user.userId },
                        {
                            $set: {
                                uri: url,
                            },
                        })

                    res.json({ result: true })
                } else {
                    return res.json({ result: false, error: resultCopy });
                }   
            }
    }

})







router.get('/passions', async (req, res) => {
    try {
        const passions = await Passion.find();
        res.json({ result: true, passions: passions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router; 
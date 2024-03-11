const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { checkBody } = require('../modules/checkBody');

const User = require('../models/user.js');
const Passion = require('../models/Passion.js');
const bcrypt = require('bcrypt');

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
                            birthdate: birthdate,
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
router.post('/upload_user_photo', authenticateToken, async (req, res, next) => {
    if (req.user.userId) {
        const user = await User.findOne({ _id: req.user.userId });
        if (user) {
            const photoPath = `./tmp/${uniqid()}.jpg`;

            const resultMove = await req.files.photoFromFront.mv(photoPath);

            let url = '';
            if (!resultMove) {
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

router.get('/users', async (req, res) => {
    try {
        // Filtrer pour ne récupérer que les utilisateurs ayant un nom
        const users = await User.find({ name: { $ne: null } })
            .select('email name birthdate location bio uri gender isConnected _id')
            .populate('userPassion', 'name emoji')
            .exec();

        const formattedUsers = users.map(user => {

            return {
                email: user.email,
                name: user.name,
                birthdate: user.birthdate,
                location: user.location,
                bio: user.bio,
                uri: user.uri,
                passions: user.userPassion.map(passion => ({ id: passion._id, name: passion.name, emoji: passion.emoji })),
                gender: user.gender,
                isConnected: user.isConnected,
                userId: user._id,
            };
        });

        res.json({ result: true, users: formattedUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//get the users positions from database if they are logged
router.get('/users_position', async (req, res, next) => {
    try {
        const users = await User.find({ isConnected: true })
            .select('location name') // Sélection des champs à renvoyer
            .exec(); // Exécute la requête

        const formattedUsers = users.map(user => {
            return {
                location: user.location,
                isConnected: user.isConnected,
                name: user.name,
            };
        });

        res.json({ result: true, users: formattedUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})








//gere la connexion utilisateur en BDD lorsque l'utilisateur arrive sur le home screen
router.get('/user_connected', authenticateToken, async (req, res, next) => {
    if (req.user.userId) {

        try {
            const user = await User.findOne({ _id: req.user.userId });
            if (user) {
                const result = await User.updateOne(
                    { _id: req.user.userId },
                    {
                        $set: {
                            isConnected: true,
                        },
                    })

                res.json({ result: true, message: 'user connected' })
            }
        } catch {
            res.status(500).json({ message: error.message });
        }

    }
})



//get the personnal user information for the parameter page 
router.get('/user_personnal', authenticateToken, async (req, res, next) => {
    if (req.user.userId) {
        try {
            const user = await User.findOne({ _id: req.user.userId })
                .select('name email password gender bio uri') // Sélection des champs à renvoyer
                .exec(); // Exécute la requête

            console.log(user.name)

            if (user) {
                const user_infos = {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    gender: user.gender,
                    bio: user.bio,
                    uri: user.uri,

                }
                res.json({ result: true, user: user_infos });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
})





router.post('/delete_user', authenticateToken, async (req, res, next) => {
    if (req.user.userId) {
        if (!checkBody(req.body, ['password'])) {
            return res.status(400).json({ result: false, message: 'Missing password' });
        }
        try {
            const user = await User.findOne({ _id: req.user.userId })
            if (user && await bcrypt.compare(req.body.password, user.hash)) {

                console.log(req.body)
                const delete_user = await User.deleteOne({ _id: req.user.userId })
                res.json({ result: true, message: 'user deleted' })
            } else {
                return res.json({ result: false, error: 'user not found' })
            }
        } catch {
            res.status(500).json({ message: error.message });
        }
    }
})



router.post('/update_user_infos', authenticateToken, async (req, res, next) => {
    if (!checkBody(req.body, ['name', 'email', 'bio', 'gender'])) {
        return res.json({ result: false });
    }

    if (req.user.userId) {

        const { name, email, bio, gender } = req.body;

        try {
            const user = await User.findOne({ _id: req.user.userId });
            if (user) {
                const result = await User.updateOne(
                    { _id: req.user.userId },
                    {
                        $set: {
                            name: name,
                            email: email,
                            bio: bio,
                            gender: gender,
                        },
                    })

                res.json({ result: true, message: 'user updated' })
            }
        } catch {
            res.status(500).json({ message: error.message });
        }

    }
})



module.exports = router; 
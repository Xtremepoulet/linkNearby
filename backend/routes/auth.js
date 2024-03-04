var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');


router.post('/signin', async (req, res) => {
    if (!checkBody(req.body, ['email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const user = await User.findOne({ username: req.body.email });

    User.findOne({ username: req.body.email }).then(data => {
        if (data && bcrypt.compareSync(req.body.password, data.password)) {
            res.json({ result: true, token: data.token });
        } else {
            res.json({ result: false, error: 'User not found or wrong password' });
        }
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');


router.get('/infos', authenticateToken, (req, res, next) => {
    res.json({result: true})
})


module.exports = router; 
const jwt = require('jsonwebtoken');


function verifyToken(token) {

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }



function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
   
    console.log(token)
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyToken(token);
  
    if (!result.success) {
      return res.status(403).json({ result: false, error: result.error});
    }
    
    req.user = result.data;
    next();
  }


module.exports = { authenticateToken };

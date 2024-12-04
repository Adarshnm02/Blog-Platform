const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ message: `No token, authorization denied`})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch (error) {
        res.status(401).json({message: 'Token is not valid'})
    }
}


module.exports = authMiddleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('token BT', token)
        if (!token) {
            return res.status(400).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; // Attach user to req
        next();
    } catch (error) {
        console.log('Verification Error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token has expired.' });
        } else {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    }
};


module.exports = userAuth;

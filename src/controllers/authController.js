const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// Register User
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '3h' });
};

exports.register = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        const existingUser = await User.findOne({ $or: [{ name }, { email }] })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, password: hashedPassword, email })

        await newUser.save();
        const token = generateToken(newUser._id, 'user');
        res.status(200).json({
            success: true,
            message: 'Signup successfully',
            token,
            data: {
                name: newUser.name,
                email: newUser.email,
                _id: newUser._id,
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: error.message })
    }
};



// Login User

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, 'user')
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error during login", error: error.message })
    }
}
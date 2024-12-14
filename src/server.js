const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/database')
require('dotenv').config();


const app = express()
connectDB();

// app.use(cors ({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], 
    credentials: true
}));

app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
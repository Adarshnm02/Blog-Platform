require('dotenv').config();
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/database')


const app = express()
connectDB();

app.use(cors ({
    origin: 'http://localhost:3000',
    credentials: this
}));

app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    })
})

app.get('/', (req, res) => {
    res.send('Hello World')
});


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
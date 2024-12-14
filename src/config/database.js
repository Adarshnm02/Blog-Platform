const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); 
    } catch (error) {
        console.error('MongoDB Connection Failed: ', error.message);
        process.exit(1);
    }
};

// Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected to Database');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose Connection Error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose Disconnected.');
});

module.exports = connectDB;

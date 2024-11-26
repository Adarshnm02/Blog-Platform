const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch(error){
        console.error('MongoBD Connection Failed: ', error.message);
        // For Exit the process with failure
        process.exit(1)
    }
}


mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected to DataBase');
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose Connection error: ${err}`);
    
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose Disconnected.');
    
})


module.exports = connectDB;
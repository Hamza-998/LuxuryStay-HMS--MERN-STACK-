const mongoose = require('mongoose');
require('dotenv').config();

// Override default DNS to prevent queryTxt ETIMEOUT on Atlas
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
    try {
        if (!process.env.MONGO) {
            console.error('MongoDB connection failed: MONGO is missing from .env');
            return;
        }

        // A simple, standard Mongoose connection
        await mongoose.connect(process.env.MONGO);
        console.log('DB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

module.exports = connectDB;

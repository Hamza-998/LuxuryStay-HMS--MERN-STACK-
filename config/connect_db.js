const mongoose = require('mongoose');
require('dotenv').config();



let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        if (!process.env.MONGO) {
            console.error('MongoDB connection failed: MONGO is missing from .env');
            return;
        }

        const db = await mongoose.connect(process.env.MONGO, {
            serverSelectionTimeoutMS: 5000 
        });
        
        isConnected = db.connections[0].readyState === 1;
        console.log('DB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

module.exports = connectDB;

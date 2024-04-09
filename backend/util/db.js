require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_CONNECTION_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Atlas connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
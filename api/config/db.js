const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connection Established with: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Failed to connect to MongoDB with error: ${error}`.red.underline.bold);
    }
        
}

module.exports = connectDB;
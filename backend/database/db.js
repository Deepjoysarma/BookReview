import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const response = await mongoose.connect(`${process.env.DB_URL}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database Connection Error");
    }
}

export default connectDB;
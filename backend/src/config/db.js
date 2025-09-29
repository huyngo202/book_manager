import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('lien ket thanh cong MongoDB connected');
    } catch (error) {
        console.log(process.env.MONGO_URI);
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
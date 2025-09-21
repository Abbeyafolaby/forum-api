import mongoose from 'mongoose';

const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;

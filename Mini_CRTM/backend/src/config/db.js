import mongoose from 'mongoose';

let isConnected = false;
let lastDatabaseError = null;
mongoose.set('bufferCommands', false);

export const isDatabaseReady = () => isConnected && mongoose.connection.readyState === 1;
export const getLastDatabaseError = () => lastDatabaseError;

const connectDB = async () => {
  if (isDatabaseReady()) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    isConnected = conn.connections[0].readyState === 1;
    lastDatabaseError = null;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    isConnected = false;
    lastDatabaseError = {
      name: error.name,
      message: error.message,
      cause: error.cause?.message || null,
    };
    console.error('MongoDB connection error:', lastDatabaseError);
    throw error;
  }
};

export default connectDB;

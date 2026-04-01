import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  try {
    await connectDB();
  } catch (error) {
    console.error('Server started without MongoDB:', error.message);
  }
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

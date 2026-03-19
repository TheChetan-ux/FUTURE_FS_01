const mongoose = require("mongoose");

let cachedConnection = global.mongooseConnection;

async function connectDb() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  cachedConnection = await mongoose.connect(mongoUri);
  global.mongooseConnection = cachedConnection;

  return cachedConnection;
}

module.exports = connectDb;

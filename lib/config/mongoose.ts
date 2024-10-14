import mongoose from 'mongoose';

// Add this line to inform TypeScript about the custom global property.
declare global {
  var mongoose: { conn: any; promise: any }; // Define 'mongoose' as an object
}

let cached = global.mongoose; // Cache mongoose connection

// If no cached connection, create one and cache it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If cached connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Save the connection promise in the cache
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise; // Save the resolved connection
  return cached.conn; // Return the connection
}

export default dbConnect;

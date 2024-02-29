// lib/mongoose.js
import mongoose from "mongoose";

// Async version


// Synchronous version
export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGO_URI;
    console.log("uri", uri);
    if (typeof uri === "string") {
      return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } else {
      throw new Error("Invalid MongoDB URI");
    }
  }
}


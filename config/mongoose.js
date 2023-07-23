const mongoose = require("mongoose");

// Replace <your-mongodb-uri> with your actual MongoDB connection string
const mongoDBURI = "mongodb+srv://cacher:ibsbOet3AmGLZu9E@cluster0.davdsnz.mongodb.net/?retryWrites=true&w=majority";

// Set up the connection to MongoDB
mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

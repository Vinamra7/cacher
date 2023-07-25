const mongoose = require("mongoose");
require('dotenv').config();
// Replace <your-mongodb-uri> with your actual MongoDB connection string
const mongoDBURI = process.env.uri;
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

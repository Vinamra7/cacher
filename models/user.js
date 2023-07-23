const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  memoryAllocated: {
    type: Number,
    required: true,
  },
  memoryUsed: {
    type: Number,
    required: true,
    default:0
  },
  
  password: {
    type: String,
    required: true,
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

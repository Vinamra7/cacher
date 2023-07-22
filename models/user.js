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
  vmsAllotted: [
    {
      vmName: {
        type: String,
        required: true,
      },
      vmMemory: {
        type: Number,
        required: true,
      },
      vmIPAddress: {
        type: String,
        required: true,
      },
      subscriptionName: {
        type: String,
        required: true,
      },
      resourceGroupName: {
        type: String,
        required: true,
      },
      // Add more fields related to VM properties if needed
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

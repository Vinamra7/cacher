const mongoose = require('mongoose');

// Define the schema
const ServerSchema = new mongoose.Schema({
  vmName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  resourceGroup: {
    type: String,
    required: true,
  },
  memoryGB: {
    type: Number,
    required: true,
  },
  isRunning: {
    type: String,
    required: false,
  },
  publicIpAddress: {
    type: String,
    required: true,
  }
});

// Create the AzureVM model based on the schema
const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;

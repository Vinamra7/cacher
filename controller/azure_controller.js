const { spawn } = require('child_process');
const Server = require("../models/server.js")

const increaseCachingCapacityController = async (req, res) => {
  const scriptPath = `scripts\\vm_deploy.ps1`;
  var countOfServers = 0;
  try {
    const count = await Server.countDocuments({});
    countOfServers = count;
  } catch (err) {
    console.error('Error getting count:', err);
    res.status.send({ error: "Internal Server Error" });
  }

  // Run PowerShell with the script as an argument
  const child = spawn('powershell.exe', [scriptPath, countOfServers], {
    stdio: 'pipe' // Set 'pipe' for stdout to capture the output
  });

  // Capture and display the output of the script
  child.stdout.on('data', async (data) => {
    data = JSON.parse(data);
    try {
      if (data.location) {
        const newServer = new Server({
          vmName: "test-project" + countOfServers,
          location: data.location,
          resourceGroup: data.resourceGroup,
          memoryGB: 1,
          isRunning: data.powerState,
          publicIpAddress: data.publicIpAddress,
        })
        await newServer.save();
      }
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" })
    }
  });

  // Handle any errors that occur during script execution
  child.on('error', (err) => {
    res.status(500).send({ error: "Internal Server Error" });
  });

  // Handle the script's exit event
  child.on('exit', async (code) => {
    res.send({ data: "Updated Capacity Successfully" });
  });
};



module.exports = { increaseCachingCapacityController };

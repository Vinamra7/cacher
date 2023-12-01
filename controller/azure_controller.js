const { spawn } = require('child_process');
const Server = require("../models/server.js")
const redis = require("redis");
const { redisConnectionDetails } = require("../helpers/request_distribution.js")

const increaseCachingCapacityController = async (req, res) => {
  const {uniqueId} = req.body;
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
  const child = spawn('powershell.exe', [scriptPath, countOfServers,uniqueId], {
    stdio: 'pipe' // Set 'pipe' for stdout to capture the output
  });

  // Capture and display the output of the script
  child.stdout.on('data', async (data) => {
    data = JSON.parse(data);
    try {
      if (data.location) {
        const newServer = new Server({
          vmName: uniqueId + countOfServers,
          location: data.location,
          resourceGroup: data.resourceGroup,
          memoryGB: 1,
          isRunning: data.powerState,
          publicIpAddress: data.publicIpAddress,
          user:uniqueId,
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
const getRedisMemoryInfo = (redisOptions, callback) => {
  // Create a Redis client with the provided connection details
  const redisClient = redis.createClient(redisOptions);

  // Get the Redis server memory info using the INFO command
  redisClient.info('memory', (error, info) => {
    if (error) {
      callback(error);
    } else {
      // Parse the memory information into an object
      const memoryInfo = info.split('\r\n').reduce((result, line) => {
        const [key, value] = line.split(':');
        if (key && value) {
          result[key] = value;
        }
        return result;
      }, {});

      // Extract max memory and total memory
      const maxMemory = parseInt(memoryInfo.maxmemory, 10) || 0;
      const totalMemory = parseInt(memoryInfo.used_memory, 10) || 0;

      // Close the Redis client
      redisClient.quit();

      // Invoke the callback with the memory info
      callback(null, { maxMemory, totalMemory });
    }
  });
}



const getUsedMemoryController = async (req, res) => {
  const {uniqueId } = req.body;
  try {
    const servers = await Server.find({ user: uniqueId});
    console.log(servers);
    var usedMemory = 0;
    var totalMemory = 0;
    for (let i = 0; i < servers.length; i++) {
      getRedisMemoryInfo(servers[i].publicIpAddress, (error, memoryInfo) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).send({ error: "Something went wrong..." });
        } else {
          usedMemory += memoryInfo.totalMemory;
          totalMemory += memoryInfo.maxMemory;
        }
      });
    }
  }catch(err){
    console.error('Error:', error);
    res.status(500).send({ error: "Something went wrong..." });
  }
  var percentageUsed = (usedMemory/totalMemory)*100;
  res.send({userId:userId,memoryUsed:percentageUsed});
}


module.exports = { increaseCachingCapacityController,getUsedMemoryController};

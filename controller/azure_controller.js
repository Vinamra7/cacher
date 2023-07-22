const { spawn } = require('child_process');


const increaseCachingCapacityController = async (req, res) => {
  const scriptPath = `scripts\\vm_deploy.ps1`;

  // Run PowerShell with the script as an argument
  const child = spawn('powershell.exe', [scriptPath], {
    stdio: 'pipe' // Set 'pipe' for stdout to capture the output
  });

  // Capture and display the output of the script
  let result = '', error = '';
  child.stdout.on('data', (data) => {
    console.log(`PowerShell Output:\n${data}`);
    result = data;
  });

  // Handle any errors that occur during script execution
  child.on('error', (err) => {
    console.error(`Error executing PowerShell script: ${err}`);
    error = err;
  });

  // Handle the script's exit event
  child.on('exit', (code) => {
    console.log(`PowerShell script exited with code ${code}`);
    res.send({ result: result, error: error });
  });
};
module.exports = { increaseCachingCapacityController };

const Server = require("../models/server.js")
const getServerDetails = async ()=>{
    const serverDetails = await Server.find({});
    var serverIps = [];
    for(let i = 0;i<serverDetails.length;i++){
        serverIps.push(serverDetails[i].publicIpAddress);
    }
    return serverIps;
}
module.exports ={ getServerDetails};
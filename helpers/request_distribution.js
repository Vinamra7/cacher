const HashRing = require('node-hashring');
const {serverDetails} = require("../controller/server_details")
const hashRing = new HashRing(serverDetails);
const getHashNode = (uniqueKey) => {
    return hashRing.findNode(uniqueKey);
};

const redisConnectionDetails = (serverIpAddress)=>{
    return {host:serverIpAddress,port:6379,password:"abcd"}

}
module.exports = {getHashNode,redisConnectionDetails};

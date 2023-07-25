const HashRing = require('node-hashring');
const { getServerDetails } = require("../controller/server_details")
const getHashNode = async (uniqueKey) => {
    const serverDetails = await getServerDetails();
    const hashRing = new HashRing(serverDetails);
    return hashRing.findNode(uniqueKey);
};

const redisConnectionDetails = (serverIpAddress) => {
    return { host: serverIpAddress, port: 8000, password: "abcd" }

}
module.exports = { getHashNode, redisConnectionDetails };

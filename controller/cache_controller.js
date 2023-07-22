const {getHashNode,redisConnectionDetails } = require('../helpers/request_distribution');
const Redis = require('ioredis');
const addKeyController = async (req,res) =>{
    const {uniqueId,cacheKey,value } = req.body;
    const uniqueKey = uniqueId + cacheKey;
    let serverIpAddress = getHashNode(uniqueKey);
    const connectionDetails =  redisConnectionDetails(serverIpAddress);
    const redis = await new Redis(connectionDetails);
    await redis.set(uniqueKey,value );
    res.send({ "message" : "done","server" : serverIpAddress}); 
}

const getKeyController = async (req,res) =>{
    const {uniqueId,cacheKey } = req.body;
    const uniqueKey = uniqueId + cacheKey;
    let serverIpAddress = getHashNode(uniqueKey);
    const connectionDetails =  redisConnectionDetails(serverIpAddress);
    const redis = await new Redis(connectionDetails);
    const keyValue = await redis.get(uniqueKey);
    res.send({ "message" : "done","server" : serverIpAddress,"keyValue":keyValue}); 
}
module.exports = {addKeyController,getKeyController};
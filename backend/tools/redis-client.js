// redis-client.js

const redis = require('redis');
const { promisify } = require('util');

// access env variables
require('dotenv').config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@redis-19934.c250.eu-central-1-1.ec2.cloud.redislabs.com:19934`
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

// Convert Redis client methods to return Promises
redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
redisClient.delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = redisClient;
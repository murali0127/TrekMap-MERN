const redis = require('redis');

if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config()
}

//Create Redis Client

const client = redis.createClient({
      url: process.env.REDIS_URL,
      legacyMode: false
})


//Handle Events
client.on('connect', () => {
      console.log('Redis Client connected.');
})
client.on('error', (err) => {
      console.log('Redis client connection error');
      console.log(err.message);
})
client.on('end', () => {
      console.log('Redis Client disconnected.');
})

//Connecting Redis 
const connectRedis = async () => {
      try {
            await client.connect();
            console.log('Conneceted to redis');
            return client;
      } catch (err) {
            console.log('Redis Connection Error...');
            console.log(err.message);
      }
}


//Shutdown
const redisShutDown = async () => {
      try {
            await client.quit();
            console.log('Redis Shutdowned successfully.')
      } catch (error) {
            console.log('Error occurred while shutting down Redis.');
            console.log(error.message);
      }
}




module.exports = {
      client, connectRedis, redisShutDown
}
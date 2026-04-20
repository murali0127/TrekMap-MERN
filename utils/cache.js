const { client } = require('./redis');


//Get cached Data from redis
const getCache = async (key) => {
      try {

            if (!client.isOpen) {
                  console.warn(`Client is not connected redis`);
                  return;
            }
            const data = await client.get(key);
            if (data) {

                  console.log(`Cache HIT: ${key}`);
                  return JSON.parse(data);

            }
            else {
                  console.log(`Cacher miss : ${key}`)
                  return null;
            }
      } catch (error) {
            console.log(`Error setting up cache data, ${error.message}`);
            return null;
      }
}



//SET Cache Data with TTL
const setCache = async (key, data, ttlSeconds = 300) => {
      try {

            if (!client.isOpen) {
                  console.warn(`Client is not connected redis`);
                  return;
            }
            const serializedData = JSON.stringify(data);
            await client.setEx(key, ttlSeconds, serializedData);
            console.log(`Cache data set to redis succesfully , key: ${key} data : ${serializedData.slice(0, 100)}`);
      } catch (error) {
            console.log(`Error setting up cache data, ${error.message}`)
      }
}

//DELETE cache Data key
const deleteCache = async (key) => {
      try {

            if (!client.isOpen) {
                  console.warn(`Client is not connected redis`);
                  return;
            }
            await client.del(key);
            console.log(`Cache deleted : ${key}`);
      } catch (error) {
            console.log(`Error deleting cache ${key}`);
            return;
      }
}

//DELETE all Cache Keys matching pattern
const deleteCachePattern = async (pattern) => {
      try {
            if (!client.isOpen) {
                  return;
            }
            let cursor = 0;
            do {
                  const reply = await client.scan(cursor, { MATCH: pattern, COUNT: 100 })
                  cursor = reply.cursor;
                  if (reply.keys.length > 0) {
                        await client.del(key);
                        console.log(`Cache DELETE pattern : ${pattern} (${key.length} keys)`)

                  }
            } while (cursor !== 0);
      } catch (err) {
            console.log(`Cache pattern delete error.`, err);
      }
}


//GETorSET cacheData
const getOrSetCache = async (key, fetchFn, ttlSeconds = 3000) => {
      try {

            const cacheData = await getCache(key);
            if (cacheData !== null) {
                  return cacheData;
            }
            //FETCH FROM SOURCE
            const freshData = await fetchFn();

            if (freshData === null) {
                  console.warn('Cache SKIP.');
                  return null;
            }
            await setCache(key, freshData, ttlSeconds);
            return freshData;
      } catch (error) {
            console.error('getOrSetCache ERROR : ', error.message);
            return;
      }

};


module.exports = {
      getCache,
      setCache,
      deleteCache,
      deleteCachePattern,
      getOrSetCache
}


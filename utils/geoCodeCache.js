const { getOrSetCache } = require('./cache');
const { forwardGeoCode } = require('./geocode');

const cachedGeocode = async (location, district) => {
      const cacheKey = `geocode:${location}:${district}`;

      return getOrSetCache(
            cacheKey,
            async () => {
                  const result = await forwardGeocode(location, district)
                  if (!result) {
                        console.error('Geocode returned Empty Code...');
                        return;

                  }
                  return result;

            },
            86400 // CACHE FOR 1 DAY (24 hrs)

      );
};
module.exports = { cachedGeocode };
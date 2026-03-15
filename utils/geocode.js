const axios = require('axios');

module.exports.forwardGeocode = async function (location, district) {
      const apiKey = process.env.MAPTILER_KEY;
      const query = `${location}, ${district}, India`
      const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${apiKey}&limit=1`;
      try {
            const response = await axios.get(url);
            // const type = response.data.features[0].geometry.type;
            const coordinates = response.data.features[0].geometry.coordinates;
            return coordinates;


      }
      catch (err) {

      }

};
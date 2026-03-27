const toRadian = (data) => {
      const denomiator = Math.PI / 180;
      return data * denomiator;

}
// const getDistanceInKilometer = (distance) => {
//       return distance * 1.609344;
// }

const getDistance = (lat1, lng1, lat2, lng2) => {
      const R = 6371; // km

      //GET COORDINATES DAT IN RADIAN 
      const lat1Rad = toRadian(lat1);
      const lat2Rad = toRadian(lat2);
      const lng1Rad = toRadian(lng1);
      const lng2Rad = toRadian(lng2);


      //COMPUTE DISTANCE 
      let value =
            Math.sin(lat1Rad) * Math.sin(lat2Rad) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.cos(lng2Rad - lng1Rad);

      value = Math.min(1, Math.max(-1, value));

      return R * Math.acos(value);
}


module.exports = getDistance;
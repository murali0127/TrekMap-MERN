const path = require('path');
const { Trekking } = require('../models/trekking');
const Food = require('../models/food')
const mongoose = require('mongoose');
const data = require('./locations')
const foods = require('./foods')
const hotels = require('./hotels');
const Hotel = require('../models/hotel');
//Connect MongoDB
mongoose.connect('mongodb://localhost:27017/Trek-Map')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error.'));
db.once('open', () => {
      console.log('Database connected to Mongo.')
});


const seedDB = async () => {
      // for (let i = 0; i < 50; i++) {
      //       // const rand = Math.floor(Math.random() * 50);
      //       const trek = new Trekking({
      //             name: `${data[i].name}`,
      //             location: `${data[i].location}`,
      //             district: `${data[i].district}`,
      //             coordinates: data[i].coordinates,
      //             image: data[i].image,
      //             description: `${data[i].description}`

      //       })
      //       await trek.save();
      // }
      // await Trekking.deleteMany({});
      // const seedData = await Trekking.insertMany(data);
      await Food.deleteMany({})
      await Food.insertMany(foods)

      await Hotel.deleteMany({})
      await Hotel.insertMany(hotels);
      console.log('Hotel Db inserted successfully')
}

seedDB();



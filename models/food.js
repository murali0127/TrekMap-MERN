const mongoose = require('mongoose');
const { Schema } = mongoose;


const foodSchema = new Schema({
      name: {
            type: String,
            required: true
      },
      district: {
            type: String,
            required: true
      },
      state: {
            type: String,
            required: true
      },
      image: {
            type: String,
      },
      description: {
            type: String,
      },
      veg: {
            type: Boolean,
            required: true
      },
      pricerange: {
            type: Number,
      },
      hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel'
      },
      tags: {
            type: [String],
      }
      // {
      //       timestamp: true

      // }
})


const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
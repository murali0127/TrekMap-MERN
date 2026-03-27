const { required } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
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
      location: {
            address: {
                  type: String,
                  required: true
            },
            coordinates: {
                  type: {
                        type: String,
                        enum: ['Point'],
                        // required: true
                  },
                  coordinates: {
                        type: [Number], // [longitude, latitude]
                        // required: true
                  }
            }
      },
      image: {
            type: String,
      },
      description: {
            type: String,
      },
      contact: {
            phone: {
                  type: Number,
                  required: true,
            },
            alternatePhone: {
                  type: Number,
            },
            website: {
                  type: String,
            }
      },
      pricerange: {
            type: Number,
      },
      rating: {
            type: Number,
      },
      distanceFromTrek: {
            type: Number,
      },
      aminities: {
            type: [String],
      },
      bookingAvailable: {
            type: Boolean,
      }
})


const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
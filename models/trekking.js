const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const trekkingSchema = new Schema({
      name: {
            type: String,
            required: true
      },
      location: {
            type: String,
            required: true
      },
      district: {
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
      },
      image: {
            type: String,
      },
      description: {
            type: String,
            // required : true
      },
      permit: {
            type: String,
            enum: ["NotRequired", "ForestPass", "CommercialLicense", "SeasonalRestriction", "OnRequest"],
            default: "NotRequired"
      },
      reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
      }]
})
Trekking = mongoose.model('Trekking', trekkingSchema);
module.exports = Trekking;


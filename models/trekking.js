const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;
const User = require('./user');
const { trekSchema } = require('../validateSchema');

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
            enum: ["NotRequired", "Required", "ForestPass", "CommercialLicense", "SeasonalRestriction", "OnRequest"],
            default: "NotRequired"
      },
      author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
      },
      reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
      }]
})


trekkingSchema.post('findOneAndDelete', async function (document) {
      if (document) {
            await Review.deleteMany({
                  _id: {
                        $in: document.reviews
                  }
            })
      }
});
Trekking = mongoose.model('Trekking', trekkingSchema);
module.exports = { Trekking, trekSchema };


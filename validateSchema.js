
const Joi = require('joi');
const ExpressError = require('./utils/ExpressError');

//JOI VALIDATION MIDDLEWARE

module.exports.trekSchema = Joi.object({
      trekking: Joi.object({
            name: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            location: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            district: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            image: Joi.string().required(),
            description: Joi.string().required()
      }).required()
})






module.exports.reviewSchema = Joi.object({
      review: Joi.object({
            rating: Joi.number().min(0).max(5).required(),
            body: Joi.string().required()
      }).required()
})

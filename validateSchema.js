
const Joi = require('joi');
const ExpressError = require('./utils/ExpressError');

//JOI VALIDATION MIDDLEWARE
const validateTrekking = (req, res, next) => {
      const trekSchema = Joi.object({
            name: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            location: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            district: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            image: Joi.string().required(),
            description: Joi.string().required()
      }).required();
      const { error } = trekSchema.validate(req.body.trekkings);
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 404)
      } else {
            next();
      }
}

module.exports = validateTrekking;

module.exports.reviewSchema = Joi.object({
      review: Joi.object({
            rating: Joi.number().min(0).max(5).required(),
            body: Joi.string().required()
      }).required()
})
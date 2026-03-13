
const originalJoi = require('joi');
const ExpressError = require('./utils/ExpressError');
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
      type: 'string',
      base: joi.string(),
      messages: {
            'string.escapeHTML': '{{#label}} must not include HTML!'
      },
      rules: {
            escapeHTML: {
                  validate(value, helpers) {
                        const clean = sanitizeHtml(value, {
                              allowedTags: [],
                              allowedAttributes: {},
                        });
                        if (clean !== value) return helpers.error('string.escapeHTML', { value })
                        return clean;
                  }
            }
      }
});


const Joi = originalJoi.extend(extension)

//JOI VALIDATION MIDDLEWARE

module.exports.trekSchema = Joi.object({
      trekking: Joi.object({
            name: Joi.string().pattern(/^[A-Za-z\s]+$/).required().escapeHTML(),
            location: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
            district: Joi.string().pattern(/^[A-Za-z\s]+$/).required().escapeHTML(),
            image: Joi.string().required(),
            description: Joi.string().required()
      }).required()
})




module.exports.reviewSchema = Joi.object({
      review: Joi.object({
            rating: Joi.number().min(0).max(5).required(),
            body: Joi.string().required().escapeHTML(),
      }).required()
})


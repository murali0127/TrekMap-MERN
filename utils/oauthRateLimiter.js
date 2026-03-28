const rateLimiter = require('express-rate-limit');

const oauthLimiter = rateLimiter({
      windowMs: 15 * 60 * 1000,   //15 minutes
      max: 5, // 5 attempts per window
      message: 'Too many login attempts. Please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
})

module.exports = oauthLimiter;
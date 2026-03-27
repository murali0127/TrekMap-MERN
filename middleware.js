const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const { reviewSchema } = require('./validateSchema')
const { Trekking } = require('./models/trekking');
const { trekSchema } = require('./models/trekking')
const { Review } = require('./models/review');

//STORE RETURN URL IN SESSION MIDDLEWARE
const storeReturnTo = (req, res, next) => {
      if (req.session && req.session.returnTo) {
            res.locals.returnTo = req.session.returnTo;
      }
      next();
}

//CHECK LOGGERIN USER MIDDLEWARE
const isLoggedIn = (req, res, next) => {
      if (!req.isAuthenticated()) {
            //Store thr url user requesting
            req.session.returnTo = req.originalUrl
            req.flash('error', 'Login required.');
            return res.redirect('/login')
      }
      next();
}

//VALIDATE TREKKING MIDDLWARE
const validateTrekking = (req, res, next) => {
      const { error } = trekSchema.validate(req.body);
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400)
      } else {
            next();
      }
}

//AUTHORIZATION MIDDLEWARE
const isAuthorize = async (req, res, next) => {
      const trekking = await Trekking.findById(req.params.id).populate('author');
      if (!trekking.author || !trekking.author.equals(req.user._id)) {
            req.flash('error', "You don't have the permission.");
            return res.redirect(`/treks/${req.params.id}`)
      }
      next();
}

//VALIDATE REVIEW MIDDLEWARE
const validateReview = (req, res, next) => {
      const { error } = reviewSchema.validate(req.body, { convert: true });
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400);
      }
      next();
}

const isReviewAuthorize = async (req, res, next) => {
      const { id, reviewId } = req.params;
      const review = await Review.findById(reviewId);
      if (!review) {
            req.flash('error', 'Review not found.');
            return res.redirect(`/treks/${id}`);
      }
      if (!review.author.equals(req.user._id)) {
            req.flash('error', 'Sorry! You dont have permission.');
            return res.redirect(`/treks/${id}`);
      }
      next();
}




module.exports = { isLoggedIn, storeReturnTo, validateTrekking, isAuthorize, validateReview, isReviewAuthorize };

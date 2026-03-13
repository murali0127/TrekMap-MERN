const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../validateSchema');
const { Review } = require('../models/review');
const { Trekking } = require('../models/trekking')
const flash = require('connect-flash');
const { isLoggedIn, validateReview, isAuthorize, isReviewAuthorize } = require('../middleware');


//ADDING REVIEWS
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
      const trek = await Trekking.findById(req.params.id);
      const { review } = req.body;
      const rev = new Review(review);
      rev.author = req.user._id;
      trek.reviews.push(rev);
      await trek.save();
      await rev.save();
      req.flash('success', 'Added Review successfully.')
      res.redirect(`/treks/${trek._id}`)

}));

router.delete('/:reviewId', isLoggedIn, isReviewAuthorize, catchAsync(async (req, res) => {
      const { id, reviewId } = req.params;
      const trek = await Trekking.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  //REMOVES THE RFERENCE OF REVIEW IN TREKKING MODEL
      await Review.findByIdAndDelete(reviewId);
      req.flash('success', 'Deleted Review successfully.')
      res.redirect(`/treks/${trek._id}`);

}));
// router.post('/',isLoggedIn, validateReview, catchAsync(async (req, res) => {
//       const trek = await Trekking.findById(req.params.id);
//       const { review } = req.body;
//       const rev = new Review(review);
//       trek.reviews.push(rev);
//       await trek.save();
//       await rev.save();
//       res.redirect(`/treks/${trek._id}`)

// }));


module.exports = router;
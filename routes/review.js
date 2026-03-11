const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../validateSchema');
const Review = require('../models/review');
const flash = require('connect-flash');

const validateReview = (req, res, next) => {
      const { error } = reviewSchema.validate(req.body, { convert: true });
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 404);
      } else {
            next();
      }
}



//ADDING REVIEWS
router.post('/', validateReview, catchAsync(async (req, res) => {
      const trek = await Trekking.findById(req.params.id);
      const { review } = req.body;
      // console.log(review)
      const rev = new Review(review);
      // console.log(rev)
      trek.reviews.push(rev);
      await trek.save();
      await rev.save();
      req.flash('success', 'Added Review successfully.')
      res.redirect(`/treks/${trek._id}`)

}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
      const { id, reviewId } = req.params;
      const trek = await Trekking.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  //REMOVES THE RFERENCE OF REVIEW IN TREKKING MODEL
      await Review.findByIdAndDelete(reviewId);
      req.flash('success', 'Deleted Review successfully.')
      res.redirect(`/treks/${trek._id}`);


}));
router.post('/review', validateReview, catchAsync(async (req, res) => {
      const trek = await Trekking.findById(req.params.id);
      const { review } = req.body;
      // console.log(review)
      const rev = new Review(review);
      // console.log(rev)
      trek.reviews.push(rev);
      await trek.save();
      await rev.save();
      res.redirect(`/treks/${trek._id}`)

}));


module.exports = router;
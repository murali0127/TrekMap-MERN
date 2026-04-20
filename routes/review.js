const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../validateSchema');
const { Review } = require('../models/review');
const { Trekking } = require('../models/trekking')
const flash = require('connect-flash');
const { isLoggedIn, validateReview, isAuthorize, isReviewAuthorize } = require('../middleware');
//controller
const reviews = require('../controllers/reviews');
const { getCache } = require('../utils/cache');


//ADDING REVIEWS
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthorize, catchAsync(reviews.deleteReview));


module.exports = router;
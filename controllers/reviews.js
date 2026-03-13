const { Review } = require('../models/review');
const { Trekking } = require('../models/trekking')


module.exports.addReview = async (req, res) => {
      const trek = await Trekking.findById(req.params.id);
      const { review } = req.body;
      const rev = new Review(review);
      rev.author = req.user._id;
      trek.reviews.push(rev);
      await trek.save();
      await rev.save();
      req.flash('success', 'Added Review successfully.')
      res.redirect(`/treks/${trek._id}`)

}


module.exports.deleteReview = async (req, res) => {
      const { id, reviewId } = req.params;
      const trek = await Trekking.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  //REMOVES THE RFERENCE OF REVIEW IN TREKKING MODEL
      await Review.findByIdAndDelete(reviewId);
      req.flash('success', 'Deleted Review successfully.')
      res.redirect(`/treks/${trek._id}`);

}
const { Review } = require('../models/review');
const { Trekking } = require('../models/trekking')
const User = require('../models/user');
const { deleteCache } = require('../utils/cache');


module.exports.addReview = async (req, res) => {
      const trek = await Trekking.findById(req.params.id);

      if (!trek) {
            req.flash('error', 'Trekking not Found...');
            return res.redirect('/treks');
      }
      const { review } = req.body;
      const rev = new Review(review);
      rev.author = req.user._id;
      trek.reviews.push(rev);
      await Promise.all([rev.save(), trek.save()])
      await User.findByIdAndUpdate(
            req.user._id,
            { $inc: { 'stats.reviewsWritten': 1 } },
            { new: true });

      //DELETE PREVIOUS TREKKING
      await deleteCache(`trek:${trek._id}`)
      req.flash('success', 'Added Review successfully.')
      res.redirect(`/treks/${trek._id.toString()}`)

}


module.exports.deleteReview = async (req, res) => {
      try {

            const { id, reviewId } = req.params;
            const trek = await Trekking.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  //REMOVES THE RFERENCE OF REVIEW IN TREKKING MODEL
            await Review.findByIdAndDelete(reviewId);

            //DELTE FROM CACHE
            await deleteCache(`trek:${trek._id}`)
            req.flash('success', 'Deleted Review successfully.')
            res.redirect(`/treks/${trek._id}`);
      } catch (error) {
            console.error('Error Fetching Review..', error.message);
            res.redirect(`/treks/${id}`);
      }

}
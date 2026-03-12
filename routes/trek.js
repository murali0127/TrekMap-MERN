const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { trekSchema } = require('../validateSchema');
const falsh = require('connect-flash');
const Trekking = require('../models/trekking');
const mongoose = require('mongoose');
const { isLoggedIn, isAuthorize, validateTrekking } = require('../middleware')




router.get('/', isLoggedIn, catchAsync(async (req, res) => {
      const trekkings = await Trekking.find({});
      res.render('trekkings/index', { trekkings });
}));

router.post('/', validateTrekking, catchAsync(async (req, res, next) => {
      // console.log(req.body);
      const newTrek = new Trekking(req.body.trekking);
      newTrek.author = req.user._id;
      await newTrek.save();
      req.flash('success', 'Succesfully created new Trekking.')
      res.redirect(`/treks/${newTrek._id}`);

}))

router.get('/new', isLoggedIn, (req, res) => {
      res.render('trekkings/new')
})
router.get('/:id', catchAsync(async (req, res, next) => {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Trekking not found!');
            return res.redirect('/treks');
      }
      const data = await Trekking.findById(id).populate('reviews').populate('author').populate({
            path: 'reviews',
            populate: {
                  path: 'author'
            }
      });
      console.log(data)
      if (data === null) {
            req.flash('error', 'Trekking not found!');
            return res.redirect('/treks')
      }

      res.render('trekkings/show', { data });


}));

router.get('/:id/edit', isLoggedIn, isAuthorize, catchAsync(async (req, res) => {
      const trekking = await Trekking.findById(req.params.id).populate('author');
      if (!trekking) {
            req.falsh('error', 'Trekking not found.');
            return res.redirect('/treks')
      }

      res.render('trekkings/edit', { trekking })
}));
router.put('/:id', isLoggedIn, isAuthorize, validateTrekking, catchAsync(async (req, res) => {
      const id = req.params.id;
      const data = await Trekking.findByIdAndUpdate({ _id: id }, { ...req.body.trekking }, { new: true });
      req.flash('success', 'Updated successfully')
      res.redirect(`/treks/${id}`)
}));

router.delete('/:id', isLoggedIn, isAuthorize, catchAsync(async (req, res) => {
      const id = req.params.id;
      const deleted = await Trekking.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted Trekking.')
      res.redirect('/treks');
}));



module.exports = router;
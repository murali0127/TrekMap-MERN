const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { trekSchema } = require('../validateSchema');
const falsh = require('connect-flash');
const Trekking = require('../models/trekking');
const mongoose = require('mongoose');

const validateTrekking = (req, res, next) => {
      const { error } = trekSchema.validate(req.body);
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 400)
      } else {
            next();
      }
}

router.get('/', catchAsync(async (req, res) => {
      const trekkings = await Trekking.find({});
      res.render('trekkings/index', { trekkings });
}));

router.post('/', validateTrekking, catchAsync(async (req, res, next) => {
      console.log(req.body);
      const newTrek = new Trekking(req.body.trekking);
      await newTrek.save();
      req.flash('success', 'Succesfully created new Trekking.')
      res.redirect(`/treks/${newTrek._id}`);

}))

router.get('/new', (req, res) => {
      res.render('trekkings/new')
})
router.get('/:id', catchAsync(async (req, res, next) => {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Trekking not found!');
            return res.redirect('/treks');
      }

      const data = await Trekking.findById(id).populate('reviews');
      if (data === null) {
            req.flash('error', 'Trekking not found!');
            return res.redirect('/treks')
      }

      res.render('trekkings/show', { data });


}));

router.get('/:id/edit', catchAsync(async (req, res) => {
      const id = req.params.id;
      const trekking = await Trekking.findById({ _id: id });
      res.render('trekkings/edit', { trekking })
}));
router.put('/:id', validateTrekking, catchAsync(async (req, res) => {
      const id = req.params.id;
      const data = await Trekking.findByIdAndUpdate({ _id: id }, { ...req.body.trekking }, { new: true });
      res.flash('success', 'Updated successfully')
      res.redirect(`/treks/${id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
      const id = req.params.id;
      const deleted = await Trekking.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted Trekking.')
      res.redirect('/treks');
}));



module.exports = router;
const { Trekking } = require('../models/trekking');
const mongoose = require('mongoose');


module.exports.index = async (req, res, next) => {
      const trekkings = await Trekking.find({});
      res.render('trekkings/index', { trekkings });
};
module.exports.renderNewForm = (req, res) => {
      res.render('trekkings/new')
}

module.exports.createNewTrek = async (req, res, next) => {
      const newTrek = new Trekking(req.body.trekking);
      newTrek.author = req.user._id;
      await newTrek.save();
      req.flash('success', 'Succesfully created new Trekking.')
      res.redirect(`/treks/${newTrek._id}`);

}

module.exports.showTrekking = async (req, res, next) => {
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

}

module.exports.getEditForm = async (req, res) => {
      const trekking = await Trekking.findById(req.params.id).populate('author');
      if (!trekking) {
            req.falsh('error', 'Trekking not found.');
            return res.redirect('/treks')
      }

      res.render('trekkings/edit', { trekking })
};

module.exports.editTrekking = async (req, res) => {
      const id = req.params.id;
      const data = await Trekking.findByIdAndUpdate({ _id: id }, { ...req.body.trekking }, { new: true });
      req.flash('success', 'Updated successfully')
      res.redirect(`/treks/${id}`)
}

module.exports.deleteTrek = async (req, res) => {
      const id = req.params.id;
      const deleted = await Trekking.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted Trekking.')
      res.redirect('/treks');
}
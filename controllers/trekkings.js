const { cloudinary } = require('../cloudinary');
const { Trekking } = require('../models/trekking');
const mongoose = require('mongoose');
const { forwardGeocode } = require('../utils/geocode')
const maptilerClient = require('@maptiler/client')
const { getPaginationParams, getPaginationLinks, getPaginationMetadata } = require('../utils/pagination')
if (!process.env.NODE_ENV === 'production') {
      require('dotenv').config();
}

module.exports.index = async (req, res, next) => {

      //Pagination
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      //get Pagination Parameter
      const { skip, limit: pageLimit, page: currentPage } = getPaginationParams(page, limit);

      const trekkings = await Trekking.find({})
            .skip(skip)
            .limit(pageLimit)
            .sort({ _id: -1 })  //Ascending order -> Newest First
            .lean();   // .lean() -> Returns Plain Javascript Object instead of Mongo Document while performing a query

      //Pagination metadata
      const totalTreks = await Trekking.countDocuments();

      const pagination = getPaginationMetadata(totalTreks, currentPage, pageLimit);

      const maptilerKey = process.env.MAPTILER_KEY
      res.render('trekkings/index', { trekkings, maptilerKey, pagination });
};
module.exports.renderNewForm = (req, res) => {
      res.render('trekkings/new')
}

module.exports.createNewTrek = async (req, res, next) => {
      const newTrek = new Trekking(req.body.trekking);
      const imgs = req.files.map(file => ({
            url: file.path,
            filename: file.filename
      }))
      if (imgs.length <= 5) {
            //Add Coordinates to DB
            const geocode = await forwardGeocode(newTrek.location, newTrek.district);
            newTrek.coordinates.type = "Point";
            newTrek.coordinates.coordinates = geocode;
            newTrek.image = imgs;
            newTrek.author = req.user._id;
            await newTrek.save();
            req.flash('success', 'Succesfully created new Trekking.')
            return res.redirect(`/treks/${newTrek._id}`);

      } else {
            req.flash('error', 'Only less than 5 photos are allowded.')
            return res.redirect(`/treks/new`)
      }

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
      const geocode = await forwardGeocode(data.location, data.district)
      // console.log(`GeoCode : ${geocode}`);
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
      //deleteImages
      if (req.body.deleteImages) {
            //DELETE FROM CLOUDINARY STORAGE
            for (let filename of req.body.deleteImages) {
                  await cloudinary.uploader.destroy(filename)
            }
            //DELETE FROM MONGODB
            await data.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
      }
      const imgs = req.files.map(file => ({
            url: file.path,
            filename: file.filename
      }))
      const total_length = data.image.length + imgs.length;
      if (total_length <= 10) {

            data.image.push(...imgs);
            await data.save();
            req.flash('success', 'Updated successfully')
            return res.redirect(`/treks/${id}`)
      } else {
            //remove from cloud storage
            for (let img of imgs) {
                  await cloudinary.uploader.destroy(img.filename);
            }
            req.flash('error', 'Images should be lesser than or equal to 5');
            return res.redirect(`/treks/${id}/edit`);
      }

}

module.exports.deleteTrek = async (req, res) => {
      const id = req.params.id;
      const deleted = await Trekking.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted Trekking.')
      res.redirect('/treks');
}
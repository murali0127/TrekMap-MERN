const { cloudinary } = require('../cloudinary');
const { Trekking } = require('../models/trekking');
const Food = require('../models/food')
const User = require('../models/user')
const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
const { forwardGeocode } = require('../utils/geocode')
const { cachedGeocode } = require('../utils/geoCodeCache');
const maptilerClient = require('@maptiler/client')
const { getPaginationParams, getPaginationLinks, getPaginationMetadata } = require('../utils/pagination');
const getDistance = require('../utils/distance');

if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
}

//REDIS CACHE
const { setCache, getCache, getOrSetCache, deleteCache, deleteCachePattern } = require('../utils/cache');


//GERNEATE CACHE KEY
const getCacheKey = (page, limit) => {
      return `treks:page:${page}:limit:${limit}`;

}

module.exports.index = async (req, res, next) => {

      //Pagination
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      //get Pagination Parameter
      const { skip, limit: pageLimit, page: currentPage } = getPaginationParams(page, limit);

      const cacheKey = getCacheKey(currentPage, pageLimit);

      //GET FROM CACHE OR FETCH FROM DB
      const responseData = await getOrSetCache(cacheKey, async () => {
            const trekkings = await Trekking.find({})
                  .skip(skip)
                  .limit(pageLimit)
                  .sort({ _id: -1 })
                  .lean();

            const totalTreks = await Trekking.countDocuments();
            const totalPages = Math.ceil(totalTreks / pageLimit);

            return { trekkings, currentPage, totalPages, totalTreks, limit: pageLimit };
      }, 300); //CACHE FOR 5MINS

      const maptilerKey = process.env.MAPTILER_KEY
      const pagination = getPaginationMetadata(responseData.totalTreks, responseData.currentPage, responseData.limit);

      res.render('trekkings/index', { trekkings: responseData.trekkings, maptilerKey, pagination });
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
            const geocode = await cachedGeocode(newTrek.location, newTrek.district);
            newTrek.coordinates.type = "Point";
            newTrek.coordinates.coordinates = geocode;
            newTrek.image = imgs;
            newTrek.author = req.user._id;
            await newTrek.save();

            //Push Trekking id to use model
            await User.findByIdAndUpdate(req.user._id, { $push: { treks: newTrek._id } })


            req.flash('success', 'Succesfully created new Trekking.')

            //INVALIDATE PAGE LISTINGS CACHE
            await deleteCachePattern('treks:page:*');

            return res.redirect(`/treks/${newTrek._id}`);

      } else {
            req.flash('error', 'Only less than 5 photos are allowded.')
            return res.redirect(`/treks/new`)
      }

}

module.exports.showTrekking = async (req, res, next) => {
      const { id } = req.params
      const cacheKey = `trek:${id}`;
      if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Trekking not found!');
            return res.redirect('/treks');
      }

      try {
            const data = await getOrSetCache(
                  cacheKey,
                  async () => {
                        const trek = await Trekking.findById(id).populate({
                              path: 'reviews',
                              populate: {
                                    path: 'author'
                              }
                        }).populate('author');
                        if (!trek) return null;
                        const geocode = await cachedGeocode(trek.location, trek.district);
                        return { data: trek, geocode }
                  }, 900 //CACHE FOR 15 MINUTES
            );

            if (!data) {
                  req.flash('error', 'Trekking not found!');
                  return res.redirect('/treks');
            }
            //GETTING FOODS AT TREKKING DISTRICT
            const foodData = await Food.find({ district: data.data.district });
            if (foodData) {
                  console.log(foodData);
            } else {
                  console.log('Food data not found.');
            }

            //GET HOTELS RELATED TO THE DISTRICT
            const hotels = await Hotel.find({ district: data.data.district }).lean();
            //CALCULATE DISTANCE
            const trekLat = data.data.coordinates.coordinates[1];
            const trekLng = data.data.coordinates.coordinates[0];

            for (let hotel of hotels) {
                  const hotelLat = hotel.location.coordinates.coordinates[1];
                  const hotelLng = hotel.location.coordinates.coordinates[0];

                  if (hotelLat === null || hotelLng === null) {
                        hotel.distanceFromTrek = 0;
                        continue;
                  } else {

                        const calculatedDistance = getDistance(trekLat, trekLng, hotelLat, hotelLng);
                        console.log(calculatedDistance)
                        hotel.distanceFromTrek = Number(calculatedDistance.toFixed(2));
                  }
            }
            // console.log(data);
            res.render('trekkings/show', { data: data.data, foodData, hotels });

      } catch (err) {
            console.log('Error Fetching Data');
            res.redirect('/treks')
      }

}

module.exports.getEditForm = async (req, res) => {
      const trekking = await Trekking.findById(req.params.id).populate('author');
      if (!trekking) {
            req.flash('error', 'Trekking not found.');
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
      if (total_length <= 5) {

            data.image.push(...imgs);
            await data.save();

            //INVALIDATE CACHE
            await deleteCache(`trek:${id}`);
            await deleteCachePattern('treks:page:*');

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

      //INVALIDATE CACHE
      await deleteCache(`trek:${id}`);
      await deleteCachePattern('treks:page:*');

      req.flash('success', 'Successfully deleted Trekking.')
      res.redirect('/treks');
}
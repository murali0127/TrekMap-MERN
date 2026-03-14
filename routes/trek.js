const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { trekSchema } = require('../validateSchema');
const flash = require('connect-flash');
const Trekking = require('../models/trekking');
const mongoose = require('mongoose');
const { isLoggedIn, isAuthorize, validateTrekking } = require('../middleware');
//MULTER & CLOUDINARY STORAGE
const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

//Controllers
const trekking = require('../controllers/trekkings');


router.route('/')
      .get(isLoggedIn, catchAsync(trekking.index))
      .post(isLoggedIn, upload.array('image'), validateTrekking, catchAsync(trekking.createNewTrek));
// .post(upload.array('image'), (req, res) => {
//       console.log(req.body, req.files)
//       res.send(req.files)

// })

router.get('/new', isLoggedIn, trekking.renderNewForm);

router.route('/:id')
      .get(catchAsync(trekking.showTrekking))
      .put(isLoggedIn, isAuthorize, upload.array('image'), validateTrekking, catchAsync(trekking.editTrekking))
      .delete(isLoggedIn, isAuthorize, catchAsync(trekking.deleteTrek));




router.get('/:id/edit', isLoggedIn, isAuthorize, catchAsync(trekking.getEditForm));






module.exports = router;
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { trekSchema } = require('../validateSchema');
const falsh = require('connect-flash');
const Trekking = require('../models/trekking');
const mongoose = require('mongoose');
const { isLoggedIn, isAuthorize, validateTrekking } = require('../middleware')

//Controllers
const trekking = require('../controllers/trekkings');


router.route('/')
      .get(isLoggedIn, catchAsync(trekking.index))
      .post(isLoggedIn, validateTrekking, catchAsync(trekking.createNewTrek));

router.get('/new', isLoggedIn, trekking.renderNewForm);

router.route('/:id')
      .get(catchAsync(trekking.showTrekking))
      .put(isLoggedIn, isAuthorize, validateTrekking, catchAsync(trekking.editTrekking))
      .delete(isLoggedIn, isAuthorize, catchAsync(trekking.deleteTrek));




router.get('/:id/edit', isLoggedIn, isAuthorize, catchAsync(trekking.getEditForm));






module.exports = router;
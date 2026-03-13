const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/users');

router.route('/register')
      .get(user.renderRegisterForm)
      .post(catchAsync(user.registerUser));



router.route('/login')
      .get(storeReturnTo, (user.renderLoginForm))
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginUser);


router.get('/logout', user.logoutUser);



module.exports = router;
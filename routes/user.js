const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('../config/passport');
const { storeReturnTo } = require('../middleware');
const user = require('../controllers/users');
const { googleLogin } = require('../controllers/users')


router.route('/register')
      .get(user.renderRegisterForm)
      .post(catchAsync(user.registerUser));



router.route('/login')
      .get(storeReturnTo, (user.renderLoginForm))
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginUser);




//Oauth  GOOGLE
router.get('/oauth/google/login', passport.authenticate('google', {
      scope: ['profile', 'email']
}))

router.get('/oauth/google/callback', passport.authenticate('google', {
      failureFlash: true,
      failureRedirect: '/login'
}), (req, res) => {
      req.flash('success', `Welcome back, ${req.user.displayName || req.user.username}!`);
      res.redirect('/treks');
});


//github OAuth 
router.get('/oauth/github/login', passport.authenticate('github', {
      scope: ['profile', 'email']
}));

router.get('/oauth/github/callback', passport.authenticate('github', {
      failureFlash: true,
      failureRedirect: '/login'
}), (req, res) => {
      req.flash('success', `Welcom back, ${req.user.username || req.user.displayName}`);
      res.redirect('/treks');
})



router.get('/logout', user.logoutUser);

module.exports = router;
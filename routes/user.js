const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('../config/passport');
const { storeReturnTo, isLoggedIn } = require('../middleware');
const user = require('../controllers/users');


//passport authentication
router.route('/register')
      .get(user.renderRegisterForm)
      .post(catchAsync(user.registerUser));

router.route('/login')
      .get(storeReturnTo, (user.renderLoginForm))
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginUser);



//Oauth  GOOGLE
router.get('/oauth/google/login', passport.authenticate('google', {
      scope: ['profile', 'email']
}));

router.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
      (req, res) => {

            req.flash('success', `Welcome back ${req.user.displayName || req.user.username}`)
            res.redirect('/treks')
      })

//OAUTh Github
router.get('/oauth/github/login', passport.authenticate('github', {
      scope: ['profile', 'email']
})
)

router.get('/oauth/github/callback', passport.authenticate('github', {
      failureRedirect: '/login',
      failureFlash: true
}),
      (req, res) => {
            req.flash('success', `Welcome ${req.user.displayName || req.user.username}`);
            res.redirect('/treks')
      }
)

//GEt USER PROFILE ROUTE
router.get('/', isLoggedIn, user.showProfile)

// router.get('/edit')

// router.put('/:id')


router.get('/logout', isLoggedIn, user.logoutUser);


module.exports = router;
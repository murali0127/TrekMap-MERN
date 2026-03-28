const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('../config/passport');
const { storeReturnTo, isLoggedIn } = require('../middleware');
const user = require('../controllers/users');
const multer = require('multer');
const { storage } = require('../cloudinary');
const accountLink = require('../controllers/accountLinks');
const oauthLimiter = require('../utils/oauthRateLimiter');

// Configure multer for avatar upload (single image)
const upload = multer({
      storage,
      limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});


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

router.get('/oauth/google/callback', oauthLimiter, passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
      (req, res) => {

            req.flash('success', `Welcome back ${req.user.displayName || req.user.username}`)
            res.redirect('/treks')
      })

//OAUTh Github
router.get('/oauth/github/login', passport.authenticate('github', {
      scope: ['profile', 'email']
})
)

router.get('/oauth/github/callback', oauthLimiter, passport.authenticate('github', {
      failureRedirect: '/login',
      failureFlash: true
}),
      (req, res) => {
            req.flash('success', `Welcome ${req.user.displayName || req.user.username}`);
            res.redirect('/treks')
      }
)


// ACCOUNT LINKING ROUTES ← ADD THESE
router.get('/account/link', accountLink.showLinkPage);
router.post('/account/link', oauthLimiter, accountLink.linkAccount);
router.post('/account/link/cancel', accountLink.cancelLink);

//GET USER PROFILE ROUTE
router.get('/user/profile/:id', isLoggedIn, user.showProfile)

//GET USER EDIT PROFILE
router.get('/user/profile/:id/edit', isLoggedIn, user.renderEditProfile)

//PUT USER PROFILE (with avatar upload)
router.put('/user/profile/:id', isLoggedIn, upload.single('image'), catchAsync(user.editUserProfile))


router.get('/logout', isLoggedIn, user.logoutUser);


module.exports = router;
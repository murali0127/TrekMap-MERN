const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');



router.get('/register', (req, res) => {
      res.render('user/register')
})
router.post('/register', catchAsync(async (req, res) => {
      try {

            const { email, username, password } = req.body.user;
            const newUser = new User({ email, username });
            const registerUser = await User.register(newUser, password);
            req.login(registerUser, err => {
                  if (err) {
                        return next(err);
                  }
                  req.flash('success', 'Welcome to TrekMap.')
                  res.redirect('/treks')
            })
      }
      catch (err) {
            req.flash('error', err.message);
            res.redirect('register')
      }
}));

router.get('/login', storeReturnTo, (req, res) => {
      res.render('user/login');
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
      // console.log(storeReturnTo);
      req.flash('success', `Welcome back ${req.user.username}`);
      const redirectUrl = res.locals.returnTo || '/treks';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
});


router.get('/logout', (req, res) => {
      req.logout(function (err) {   //CALLBACK FUNCITON - Throw Error to next Middleware
            if (err) {
                  return next(err);
            }
      });
      req.flash('success', 'Logged out successfully.');
      res.redirect('/');
})



module.exports = router;
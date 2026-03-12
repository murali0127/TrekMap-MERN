const session = require('express-session')

const storeReturnTo = (req, res, next) => {
      if (req.session.returnTo) {
            res.locals.returnTo = req.session.returnTo;
      }
      next();
}

const isLoggedIn = (req, res, next) => {
      console.log('REQ USER...', req.users)
      if (!req.isAuthenticated()) {
            //Store thr url user requesting
            req.session.returnTo = req.originalUrl
            req.flash('error', 'Login required.');
            return res.redirect('/login')
      }
      next();
}


module.exports = { isLoggedIn, storeReturnTo };

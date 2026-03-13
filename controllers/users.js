const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
      res.render('user/register')
};

module.exports.registerUser = async (req, res) => {
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
}

module.exports.renderLoginForm = (req, res) => {
      res.render('user/login');
}

module.exports.loginUser = (req, res) => {
      // console.log(storeReturnTo);
      req.flash('success', `Welcome back ${req.user.username}`);
      const redirectUrl = res.locals.returnTo || '/treks';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
      req.logout(function (err) {   //CALLBACK FUNCITON - Throw Error to next Middleware
            if (err) {
                  return next(err);
            }
      });
      req.flash('success', 'Logged out successfully.');
      res.redirect('/');
}
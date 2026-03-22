const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
      res.render('user/register')
};

module.exports.registerUser = async (req, res, next) => {
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
      console.log('Current User:', req.user);
      const name = req.user.username || req.user.displayName || 'User';
      req.flash('success', `Welcome back ${name}`);
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

module.exports.showProfile = async (req, res) => {
      const user = await User.findById(req.user._id)
            .populate('treks');
      if (!user) {
            req.flash('error', 'User not found.')
            res.redirect(`/treks`)
      }

      res.render('user/profile', { user })


};

module.exports.renderEditProfile = async (req, res) => {
      const user = await User.findById(req.user.id)
      res.render('user/editProfile', { user });
}

module.exports.editUserProfile = async (req, res) => {
      const id = req.params.id;
      const user = await User.findByIdAndUpdate({ id: id }, { ...req.body.user }, { new: true });

      if (!user) {
            req.flash('error', 'User not found!');
            res.redirect('/user/profile');
      }
      req.flash('success', 'Done! Updated Successfully.')
      res.redirect('/user/profile')

}


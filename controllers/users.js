const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

// Helper function to validate user input
const validateUserProfile = (userData) => {
      const errors = [];

      // Validate username
      if (userData.username && userData.username.length < 3) {
            errors.push('Username must be at least 3 characters');
      }
      if (userData.username && userData.username.length > 30) {
            errors.push('Username cannot exceed 30 characters');
      }

      // Validate email
      if (userData.email && !/^\S+@\S+\.\S+$/.test(userData.email)) {
            errors.push('Please enter a valid email address');
      }

      // Validate bio length
      if (userData.bio && userData.bio.length > 500) {
            errors.push('Bio cannot exceed 500 characters');
      }

      // Validate website URL
      if (userData.website && !/^https?:\/\/.+$/.test(userData.website)) {
            errors.push('Website must be a valid URL (starting with http:// or https://)');
      }

      return errors;
};

module.exports.renderRegisterForm = (req, res) => {
      res.render('user/register')
};

module.exports.registerUser = async (req, res, next) => {
      try {
            const { email, username, password } = req.body.user;

            // Validate input
            const validationErrors = validateUserProfile({ email, username });
            if (validationErrors.length > 0) {
                  req.flash('error', validationErrors.join('. '));
                  return res.redirect('/register');
            }

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
            req.flash('error', err.message || 'Registration failed. Please try again.');
            res.redirect('/register')
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
      try {
            const user = await User.findById(req.user._id)
                  .populate('treks');

            if (!user) {
                  req.flash('error', 'User not found.')
                  return res.redirect(`/treks`)
            }

            // Update last active timestamp
            await user.updateLastActive();

            // Get trek count (in case populate doesn't return length)
            const treksCount = user.treks ? user.treks.length : 0;

            res.render('user/profile', {
                  user,
                  treksCount
            })
      } catch (err) {
            console.error('Error loading profile:', err);
            req.flash('error', 'Failed to load profile.');
            res.redirect('/treks');
      }
};

module.exports.renderEditProfile = async (req, res) => {
      try {
            const user = await User.findById(req.user._id);
            if (!user) {
                  req.flash('error', 'User not found!');
                  return res.redirect('/treks');
            }
            res.render('user/editProfile', { user });
      } catch (err) {
            console.error('Error loading edit profile:', err);
            req.flash('error', 'Failed to load profile.');
            res.redirect('/treks');
      }
}

module.exports.editUserProfile = async (req, res) => {
      try {
            const id = req.params.id;

            // Validate user can only edit their own profile
            if (id !== req.user._id.toString()) {
                  req.flash('error', 'You can only edit your own profile.');
                  return res.redirect('/user/profile/' + id);
            }

            const userData = req.body.user;

            // Validate input
            const validationErrors = validateUserProfile({
                  username: userData.username,
                  bio: userData.bio,
                  website: userData.website
            });

            if (validationErrors.length > 0) {
                  req.flash('error', validationErrors.join('. '));
                  return res.redirect('/user/profile/' + id + '/edit');
            }

            // Handle avatar upload
            if (req.file) {
                  // Delete old avatar from Cloudinary if exists
                  if (userData.avatarPublicId) {
                        await cloudinary.uploader.destroy(userData.avatarPublicId);
                  }

                  // Set new avatar
                  userData.avatar = req.file.path;
                  userData.avatarPublicId = req.file.filename;
            }

            // Update user
            const updatedUser = await User.findByIdAndUpdate(
                  id,
                  { $set: userData },
                  { new: true, runValidators: true }
            );

            if (!updatedUser) {
                  req.flash('error', 'User not found!');
                  return res.redirect('/user/profile');
            }

            req.flash('success', 'Profile updated successfully!')
            res.redirect('/user/profile/' + id);

      } catch (err) {
            console.error('Error updating profile:', err);
            req.flash('error', 'Failed to update profile. Please try again.');
            res.redirect('/user/profile/' + req.params.id + '/edit');
      }
}


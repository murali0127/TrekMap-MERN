const User = require('../models/user');
const { deletePendingLinks, getPendingLinks } = require('../utils/oauthPending');


exports.showLinkPage = async (req, res) => {
      const { token } = req.query;
      const pending = getPendingLinks(token)    // returns {provider : '..', googleId: '...', email : '....',...., expiresAt : '...'}

      if (!pending) {
            req.flash('error', 'Invalid or Expired Account Link request. Try again please.');
            return res.redirect('/login');

      }
      res.render('accounts/link',
            { token, email: pending.email, provider: pending.provider }
      )
}

exports.linkAccount = async (req, res, next) => {
      const { token, password } = req.body;
      const pending = getPendingLinks(token);

      if (!pending) {
            req.flash('error', 'OOPS Link request have been expired. Try agian.');
            return res.redirect('/login');

      }
      try {
            const user = await User.findById(pending.userId);
            if (!user) {
                  deletePendingLinks(token);
                  req.flash('error', 'User account does not exist!');
                  return res.redirect('/login');
            }
            const ispasswordValid = await user.authenticate(password)
            if (!ispasswordValid) {
                  console.warn(`Failed link attempt for user ${user.email}`);
                  req.flash('error', "Invalid Password.");
                  return res.redirect(`/accounts/link?token=${token}`);
            }

            //LINK THE OAUTH PROVIDER.
            if (pending.provider === 'google') {
                  user.googleId = pending.providerId;
            } else if (pending.provider === 'github') {
                  user.githubId = pending.providerId;
            }

            // Update profile info if missing
            if (!user.avatar && pending.avatar) {
                  user.avatar = pending.avatar;
            }
            if (!user.displayName && pending.displayName) {
                  user.displayName = pending.displayName;
            }

            await user.save();

            // Clean up the pending link
            deletePendingLinks(token);
            req.flash('success', 'Account linked successfully! You can now login with Google/GitHub.');
            res.redirect('/login');
      } catch (error) {
            deletePendingLinks(token);
            next(error);  //Next Error Middleware executes
      }
}


exports.cancelLink = async (req, res) => {
      const { token } = req.query;
      deletePendingLinks(token);

      req.flash('info', 'Account linking cancelled.');
      res.redirect('/login');

}
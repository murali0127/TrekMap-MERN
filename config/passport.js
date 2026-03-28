const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStratergy = require('passport-google-oauth2').Strategy;
const GithubStratergy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { setPendingLink } = require('../utils/oauthPending');

passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
      try {
            const user = await User.findById(id);
            done(null, user || false);
      } catch (err) {
            done(err, null);
      }
});

//CRYPTOGRAPHICALLY SECURE TOKEN GENERATION
function generateSpecialToken() {
      return crypto.randomBytes(32).toString('hex');
}

passport.use(new GoogleStratergy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth/google/callback',
      passReqToCallback: true   //If this is set to true 'req' must be the first argument.
},
      async (req, accessToken, refreshToken, profile, done) => {
            try {

                  let user = await User.findOne({ googleId: profile.id });
                  if (user) return done(null, user);

                  const email = profile.emails?.[0]?.value;
                  if (email) {
                        const existingUser = await User.findOne({ email });
                        if (existingUser) {
                              //GENERATE A TOKEN
                              const token = generateSpecialToken();

                              setPendingLink(token, {
                                    provider: 'google',
                                    providerId: profile.id,
                                    email: email,
                                    userId: existingUser._id.toString(),
                                    avatar: profile.photos?.[0]?.value,
                                    displayName: profile.displayName.toLowerCase()
                              })
                              //REDIRECT TO ACCOUNT LINKING PAGE
                              return req.res.redirect(`/account/link?token=${token}`)
                        }
                  }

                  //NO EXISTING ACCOUNT - CREATE A NEW USER
                  user = await User.create({
                        googleId: profile.id,
                        email: email,
                        displayName: profile.displayName.toLowerCase(),
                        avatar: profile.photos?.[0]?.value
                  });
                  return done(null, user);

            } catch (err) { return done(err, null); }
      }
));


passport.use(new GithubStratergy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/oauth/github/callback'
}, async (req, accessToken, refreshToken, profile, done) => {
      try {

            let user = await User.findOne({ githubId: profile.id });
            if (user) {
                  return done(null, user);
            }

            const email = profile.emails?.[0]?.value;
            if (email) {

                  const existingUser = await User.findOne({ email });

                  if (existingUser) {
                        const token = generateSpecialToken();

                        setPendingLink(token, {
                              provider: 'github',
                              providerId: profile.id,
                              email: email,
                              userId: existingUser._id.toString(),
                              avatar: profile.photos?.[0]?.value,
                              displayName: (profile.displayName || profile.username).toLowerCase(),
                              username: profile.username
                        })
                        return req.res.redirect(`/account/link?token=${token}`);
                  }
            }
            //CREATE A NEW USER 
            user = await User.create({
                  githubId: profile.id,
                  email: email || `${profile.username}@github.com`,
                  username: profile.username,
                  displayName: (profile.displayName || profile.username).toLowerCase(),
                  avatar: profile.photos?.[0]?.value
            });
            return done(null, user);

      } catch (err) { return done(err, null); }
}
));



module.exports = passport;
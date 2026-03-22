const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStratergy = require('passport-google-oauth2').Strategy;
const GithubStratergy = require('passport-github2').Strategy;
const User = require('../models/user');

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


passport.use(new GoogleStratergy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/oauth/google/callback'
},
      async (accessToken, refreshToken, profile, done) => {
            try {

                  let user = await User.findOne({ googleId: profile.id });
                  if (user) {
                        return done(null, user);
                  }

                  const email = profile.emails?.[0]?.value;
                  if (email) {
                        user = await User.findOne({ email });
                        if (user) {
                              user.googleId = profile.id;
                              user.avatar = user.avatar || profile.photos?.[0]?.value;
                              await user.save();
                              return done(null, user);
                        }
                  }

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
}, async (accessToken, refreshToken, profile, done) => {
      try {

            let user = await User.findOne({ githubId: profile.id });
            if (user) {
                  return done(null, user);
            }

            const email = profile.emails?.[0]?.value;
            if (email) {
                  user = await User.findOne({ email });
                  if (user) {
                        user.githubId = profile.id;
                        user.avatar = user.avatar || profile.photos?.[0]?.value;
                        await user.save();
                        return done(null, user);
                  }
            }

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
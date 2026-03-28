const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Trekking = require('./models/trekking')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

//.ENV
if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
}

//HELMET
const helmet = require('helmet');

//ERROR CLASS
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//VALIDATE SCHEMA MODULE
const { reviewSchema } = require('./validateSchema')
const Review = require('./models/review');



//CSRF
// const { doubleCsrf } = require('csrf-csrf');
// const cookieParser = require('cookie-parser');


//ROUTER
const userRouter = require('./routes/user');
const trekRouter = require('./routes/trek');
const reviewRouter = require('./routes/review')

//AUTHENTICATION
const passport = require('./config/passport');

//SESSION
const session = require('express-session');
const { expression } = require('joi');

//FLASH
const flash = require('connect-flash');
const User = require('./models/user');

//MONGO SANITIZATION (Adding Security)
const mongooseSanitize = require('express-mongo-sanitize');

//MULTER
const multer = require('multer');
const { crossOriginOpenerPolicy } = require('helmet');

// OAUTH ACCOUNTLINK
const accountLinkRouter = require('./controllers/accountLinks');

const app = express();

//Connect MongoDB
mongoose.connect('mongodb://localhost:27017/Trek-Map')
      .then(() => console.log('MongoDB Connected.'))
      .catch((err) => {
            console.log('Error : ');
            console.log(err.message);
      })



//Template Engine & views
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


//BODY Parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CSRF PROTECTION
// app.use(cookieParser(process.env.COOKIE_SECRET))




//Method-Override
app.use(methodOverride('_method'));

//HELMET MIDDLEWARE
app.use(helmet({
      contentSecurityPolicy: {
            directives: {
                  defaultSrc: ["'self'"],

                  scriptSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        "https://cdn.jsdelivr.net",
                        "https://cdn.jsdelivr.net",
                        "https://cdn.maptiler.com",
                        "https://maps.maptiler.com",
                        "https://api.maptiler.com"
                  ],

                  styleSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        "https://cdn.jsdelivr.net",
                        "https://cdn.maptiler.com",
                        "https://fonts.googleapis.com"
                  ],

                  imgSrc: [
                        "'self'",
                        "data:",
                        "blob:",
                        "https:",
                        "https://res.cloudinary.com",
                        "https://api.maptiler.com",
                        "https://images.unsplash.com",
                        "https://*.maptiler.com",
                        "https://images.openai.com",
                        "https://dynamic-media-cdn.tripadvisor.com"
                  ],

                  fontSrc: [
                        "'self'",
                        "https://cdn.jsdelivr.net",
                        "https://fonts.gstatic.com"
                  ],

                  connectSrc: [
                        "'self'",
                        "blob:",
                        "https://api.maptiler.com",
                        "https://*.maptiler.com"
                  ],
                  workerSrc: ["'self'", "blob:"],
                  frameSrc: ["'none'"],
                  objectSrc: ["'none'"],
                  baseUri: ["'self'"],
                  formAction: ["'self'"],
                  upgradeInsecureRequests: []
            }
      },
      crossOriginOpenerPolicy: false,
      crossOriginEmbedderPolicy: false
}));

//Configure Session
const sessionConfiguration = {
      name: 'session',
      secret: 'thisismysecretkey',
      resave: false,
      saveUninitialized: true,
      cookie: {
            httpOnly: true,
            // secure : true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
      }
}
app.use(session(sessionConfiguration));

//CONFIGURING AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

// const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
//       getSecret: () => process.env.CSRF_SECRET || 'dev-secret-change-in-production',
//       cookieName: 'x-csrf-cookie',
//       size: 64,
//       ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
//       getTokenFromRequest: (req) => req.body._csrf || req.headers['x-csrf-token'],
//       getSessionIdentifier: (req) => req.session.id
// })

// Apply CSRF protection - must come BEFORE routes
// app.use(doubleCsrfProtection);


// Sanitization - MongoDB Injection Prevention
// app.use(mongooseSanitize({
//     replaceWith: '_',
//     onSanitize: ({ req, res, key }) => {
//         console.warn(`[MongoSanitize] Potentially dangerous input detected: ${key}`);
//     }
// }));

//FLASH MIDDLEWARE
app.use((req, res, next) => {
      res.locals.currentUser = req.user || null;
      res.locals.success = req.flash('success');
      res.locals.error = req.flash('error')
      res.locals.info = req.flash('info')
      //CSRF  MIDDLEWARE - Make token available to views
      // res.locals.csrfToken = generateCsrfToken(req, res)
      next();
})


app.get('/', (req, res) => {
      res.render('home');
})

//Routes
app.use('/', userRouter);
app.use('/treks', trekRouter);
app.use('/treks/:id/review', reviewRouter);

// app.use('/user/profile', userRouter) //To get proifle info/ User profile Column.





//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
      console.log(err);

      // // Handle CSRF token errors
      // if (err.code === 'EBADCSRFTOKEN') {
      //       req.flash('error', 'Session expired or invalid request. Please try again.');
      //       return res.redirect('back');
      // }

      const { statusCode = 500, message = 'SOMETHING WENT WRONG' } = err;
      res.status(statusCode).render('error', { err })
})
app.listen(3000, () => {
      console.log('App is running in Port : 3000');
})
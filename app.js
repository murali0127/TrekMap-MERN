const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Trekking = require('./models/trekking')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
//ERROR CLASS
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
//VALIDATE SCHEMA MODULE
const { reviewSchema } = require('./validateSchema')
const Review = require('./models/review');
//ROUTER
const trekRouter = require('./routes/trek');
const reviewRouter = require('./routes/review')

//SESSION
const session = require('express-session');
const { expression } = require('joi');

//FLASH
const flash = require('connect-flash');

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Method-Override
app.use(methodOverride('_method'));

//Configure Session

const sessionConfiguration = {
      secret: 'thisismysecretkey',
      resave: false,
      saveUninitialized: true,
      cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
      }
}
app.use(session(sessionConfiguration));

app.use(flash());

//FLASH MIDDLEWARE
app.use((req, res, next) => {
      res.locals.success = req.flash('success');
      res.locals.error = req.flash('error')
      next();
})

//Routes
app.use('/treks', trekRouter);
app.use('/treks/:id/review', reviewRouter);


app.get('/', (req, res) => {
      res.render('home');
})



//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
      console.log(err)
      const { statusCode = 500, message = 'SOMETHING WENT WRONG' } = err;
      res.status(statusCode).render('error', { err })
})
app.listen(3000, () => {
      console.log('App is running in Port : 3000');
})
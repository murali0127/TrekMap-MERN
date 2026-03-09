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
const validateTrekking = require('./validateSchema');
const Review = require('./models/review');
const { reviewSchema } = require('./validateSchema')

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

app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Method-Override
app.use(methodOverride('_method'));

const validateReview = (req, res, next) => {
      const { error } = reviewSchema.validate(req.body, { convert: true });
      if (error) {
            const msg = error.details.map(el => el.message).join(',');
            throw new ExpressError(msg, 404);
      } else {
            next();
      }
}


app.get('/', (req, res) => {
      res.render('home');
})

app.get('/treks', catchAsync(async (req, res) => {
      const trekkings = await Trekking.find({});
      res.render('trekkings/index', { trekkings });
}));

app.post('/treks/', validateTrekking, catchAsync(async (req, res, next) => {
      console.log(req.body);
      const newTrek = await Trekking(req.body.trekkings);
      await newTrek.save();
      res.redirect(`/treks/${newTrek._id}`);

}))

app.get('/treks/new', (req, res) => {
      res.render('trekkings/new')
})
app.get('/treks/:id', catchAsync(async (req, res, next) => {
      const id = req.params.id
      const data = await Trekking.findById({ _id: id }).populate('reviews');;
      console.log(data);
      res.render('trekkings/show', { data });
}));

app.get('/treks/:id/edit', catchAsync(async (req, res) => {
      const id = req.params.id;
      const trekking = await Trekking.findById({ _id: id });
      res.render('trekkings/edit', { trekking })
}));
app.put('/treks/:id', validateTrekking, catchAsync(async (req, res) => {
      const id = req.params.id;
      const data = await Trekking.findByIdAndUpdate({ _id: id }, { ...req.body.trekkings }, { new: true });
      console.log(data);
      res.redirect(`/treks/${id}`)
}));

app.delete('/treks/:id', catchAsync(async (req, res) => {
      const id = req.params.id;
      const deleted = await Trekking.findByIdAndDelete(id)
      res.redirect('/treks');
}));

//ADDING REVIEWS
app.post('/treks/:id/review', validateReview, catchAsync(async (req, res) => {
      const trek = await Trekking.findById(req.params.id);
      const { review } = req.body;
      // console.log(review)
      const rev = new Review(review);
      // console.log(rev)
      trek.reviews.push(rev);
      await trek.save();
      await rev.save();
      res.redirect(`/treks/${trek._id}`)

}));

app.delete('/treks/:id/review/:reviewId', catchAsync(async (req, res) => {
      const { id, reviewId } = req.params;
      const trek = await Trekking.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  //REMOVES THE RFERENCE OF REVIEW IN TREKKING MODEL
      await Review.findByIdAndDelete(reviewId);
      res.redirect(`/treks/${trek._id}`);


}));
//HANDLES ALL ERRORS
app.use((req, res, next) => {
      next(new ExpressError('Page Not Error', 404));
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
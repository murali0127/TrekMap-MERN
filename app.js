const express = require('express');
const ejs = require('ejs');
// const methodOverride = require('method-override');
const path = require('path');
const Trekking = require('./models/trekking')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
//ERROR CLASS
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpreesError')



const app = express();

//Connect MongoDB
mongoose.connect('mongodb://localhost:27017/Trek-Map')
      .then(() => console.log('MongoDB Connected.'))
      .catch((err) => {
            console.log('Error : ');
            console.log(err.message);
      })

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'Connection Error.'));
// db.once('open', () => {
//       console.log('Database connected to Mongo.')
// })

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


app.get('/', (req, res) => {
      res.render('home');
})

app.get('/treks', catchAsync(async (req, res) => {
      const trekkings = await Trekking.find({});
      res.render('trekkings/index', { trekkings });
}));

app.get('/treks/new', (req, res) => {
      res.render('trekkings/new')
})
app.post('/treks/new', catchAsync(async (req, res, next) => {
      const newTrek = await Trekking(req.body.trekkings);
      await newTrek.save();
      // console.log(newTrek);
      if (!newTrek) {
            next(err);
      } else {

            res.redirect(`/treks/${newTrek._id}`);
      }
}))
app.get('/treks/:id', async (req, res, next) => {
      const id = req.params.id
      const data = await Trekking.findById({ _id: id });
      res.render('trekkings/show', { data });
});

app.get('/treks/:id/edit', catchAsync(async (req, res) => {
      const id = req.params.id;
      const trekking = await Trekking.findById({ _id: id });
      res.render('trekkings/edit', { trekking })
}));
app.put('/treks/:id', catchAsync(async (req, res) => {
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

//HANDLES ALL ERRORS
// app.all(/.*/, (req, res, next) => {
//       // res.send('404 ERROR YOU STUPID .')
//       return new ExpressError('Page Not Error', 404)
// })

//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
      const { statusCode = 500, message = 'SOMETHING WENT WRONG' } = err;
      res.status(statusCode).render('error', { err })
      // res.send('OH BOY...THERE IS AN ERROR YOU FUCKING MORON.')
})
app.listen(3000, () => {
      console.log('App is running in Port : 3000');
})
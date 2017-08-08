//PACKAGES
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

//BOILERPLATE
// for express
const app = express();

// for static sheets
app.use(express.static('public'));

// tell express to use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

//tell express to use the bodyParser middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use my routes
app.use('/', routes);

mongoose
  // connect to mongo via mongoose
  .connect('mongodb://localhost:27017/inventory', { useMongoClient: true })
  // now we can do whatever we want with mongoose.
  // configure session support middleware with express-session
  .then(() => app.listen(3000, () => console.log('Your application started!')));

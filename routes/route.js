const express = require('express');
const routes = express.Router();

const Item = require('../models/inventory');

routes.get('/', (req, res) => {
  Item.find()
    // then show my items
    .then(items => res.render('listItems', { items: items }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});

routes.get('/itemForm', (req, res) => {
  if (req.query.id) {
    Item.findById(req.query.id)
      // render form with this item
      .then(item => res.render('itemForm', { item: item }));
  } else {
    res.render('itemForm');
  }
});

routes.post('/saveItem', (req, res) => {
  Item.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
    .then(() => res.redirect('/'))
    // catch validation errors
    .catch(err => {
      console.log(err);
      res.render('itemForm', {
        errors: err.errors,
        item: req.body
      });
    });
});

routes.get('/deleteItem', (req, res) => {
  Item.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
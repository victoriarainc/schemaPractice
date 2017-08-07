const mongoose = require('mongoose');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a contact
const itemSchema = new Schema({
  category: { type: String, required: true },
  size: String,
  count: String,
  price: { type: Number, required: true },
  custom: { type: Boolean, required: true },
  materials: [],
  description: {
    color: String,
    solid: Boolean,
    shape: String,
  }
});

// create a model for a Contact
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

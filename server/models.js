'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const householdSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: String,
  phone: Array,
  household: Array,
});

module.exports.Household = mongoose.model('Household', householdSchema);


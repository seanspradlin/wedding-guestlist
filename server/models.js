'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const householdSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: String,
  phone: [{
    type: String,
    number: String,
  }],
  household: [{
    name: String,
    isChild: Boolean,
  }],
});

module.exports.Household = mongoose.model('Household', householdSchema);


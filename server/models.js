'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const householdSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  preferredContact: String,
  email: String,
  phone: [{
    type: String,
    number: String,
    canText: Boolean,
  }],
  members: [{
    firstName: String,
    lastName: String,
    isChild: Boolean,
  }],
});

module.exports = mongoose.model('Household', householdSchema);


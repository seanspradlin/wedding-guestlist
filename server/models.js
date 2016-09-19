'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const householdSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  preferredContact: String,
  email: String,
  phone: [{
    type: String,
    number: String,
  }],
  members: [{
    firstName: String,
    lastName: String,
    isChild: Boolean,
  }],
});

module.exports.Household = mongoose.model('Household', householdSchema);


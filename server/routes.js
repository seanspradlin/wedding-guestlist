'use strict';
const express = require('express');
const Household = require('./models').Household;
const winston = require('winston');

const router = express.Router();

router.post('/household', (req, res) => {
  const household = new Household(req.body);
  household.save()
    .then(res.json)
    .catch((err) => {
      winston.error(err);
      res.status(400);
      res.end();
    });
});

module.exports = router;


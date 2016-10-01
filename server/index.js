'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const winston = require('winston');
const helmet = require('helmet');
const Household = require('./models').Household;

const app = express();

mongoose.connect(config.db.url);

app.use(express.static(path.resolve('client')));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/household', (req, res) => {
  const household = new Household(req.body);
  household.save(e => {
    if (e) {
      winston.error(e);
      res.status(400);
      res.end();
    } else {
      res.json(household);
    }
  });
});

app.listen(config.port, () => {
  winston.info(`Server is running on port ${config.port}`);
});


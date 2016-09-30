'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config');
const winston = require('winston');
const helmet = require('helmet');

const app = express();

mongoose.connect(config.db.url);

app.use(express.static(path.resolve('client')));
app.use(helmet);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(config.port, () => {
  winston.info(`Server is running on port ${config.port}`);
});


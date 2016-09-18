'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-photographer',
  },
  port: process.env.PORT || '8080',
};


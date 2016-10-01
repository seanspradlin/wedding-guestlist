'use strict';
module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost/wedding-guestlist',
  },
  port: process.env.PORT || '8080',
};


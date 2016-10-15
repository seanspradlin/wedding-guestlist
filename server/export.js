'use strict';
const mongoose = require('mongoose');
const config = require('./config');
const Household = require('./models').Household;
const fs = require('fs');

mongoose.connect(config.db.url);

function template(household) {
  let s = `Name: ${household.name}\n`
      + `Address: ${household.address}\n`;
  if (household.email) s += `Email: ${household.email}\n`;
  household.phone.forEach(phone => {
    if (phone.number) {
      s += `${phone.type || 'Phone'}: ${phone.number}\n`
    }
  });

  if (household.household.length > 0) {
    s += 'Household:\n';
    household.household.forEach(member => {
      if (member.name) {
        s += `  ${member.name}`;
        if (member.isChild === 'true') s += '(Child)';
        s += '\n';
      }
    });
  }

  return s;
}

Household.find({}, (e, households) => {
  if (e) {
    console.log(e);
    process.exit();
  }
  console.log('Begin export');
  let s = '';
  households.forEach(household => {
    s += template(household);
    s += '\n\n';
  });
  console.log(s);
  fs.writeFile('export.txt', s);
});


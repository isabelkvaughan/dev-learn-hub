const Handlebars = require('handlebars');
const moment = require('moment'); // Import the Moment.js library

Handlebars.registerHelper('formatDate', (date) => {
  // Use Moment.js to format the date
  return moment(date).format('DD/MM/YYYY');
});

module.exports = Handlebars;

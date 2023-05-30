const Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', (date) => {
  // Implement your logic to format the date (e.g., using Moment.js or native JavaScript methods)
  // Example: return new Date(date).toLocaleDateString();
  return date;
});

module.exports = Handlebars;
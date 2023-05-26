const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedComment = require('./commentData');
const seedPost = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedPost();
  await seedComment();

  process.exit(0);
};

seedAll();

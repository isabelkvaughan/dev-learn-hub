const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    password: 'password456',
  },
  {
    username: 'mike_wilson',
    password: 'password789',
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUser;

const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password456',
  },
  {
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'password789',
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUser;

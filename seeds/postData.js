const { Post } = require('../models');

const postData = [
  {
    title: 'JavaScript Tips and Tricks',
    content: 'Here are some helpful tips and tricks for JavaScript developers.',
    user_id: 1,
  },
  {
    title: 'Python Tips and Tricks',
    content: 'Discover useful tips and tricks to improve your Python coding skills.',
    user_id: 2,
  },
  {
    title: 'CSS Tips and Tricks',
    content: 'Learn CSS tips and tricks to make your designs more efficient.',
    user_id: 3,
  },
  {
    title: 'Git Tips and Tricks',
    content: 'Master Git with these helpful tips and tricks for version control.',
    user_id: 1,
  },
  {
    title: 'HTML Tips and Tricks',
    content: 'Explore useful tips and tricks to enhance your HTML coding.',
    user_id: 2,
  },
];

const seedPost = async () => {
  await Post.bulkCreate(postData);
};

module.exports = seedPost;

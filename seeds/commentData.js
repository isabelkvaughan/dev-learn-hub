const { Comment } = require('../models');

const commentData = [
  // Comments for JavaScript Tips and Tricks (post_id: 1)
  {
    content: 'Great tips! I found them very useful.',
    post_id: 1,
    user_id: 2,
  },
  {
    content: 'Thanks for sharing these insights!',
    post_id: 1,
    user_id: 3,
  },

  // Comments for Python Tips and Tricks (post_id: 2)
  {
    content: 'I learned a lot from this post. Thank you!',
    post_id: 2,
    user_id: 1,
  },

  // Comments for CSS Tips and Tricks (post_id: 3)
  {
    content: 'Awesome tips! I will apply them to my projects.',
    post_id: 3,
    user_id: 2,
  },
  {
    content: 'I have been struggling with CSS. This post helped me a lot!',
    post_id: 3,
    user_id: 1,
  },
];

const seedComment = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComment;

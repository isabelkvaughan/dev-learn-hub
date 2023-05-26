const router = require('express').Router();
const { Post, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');


router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ model: User }],
      });
      const plainPosts = posts.map(post => post.get({ plain: true }));
      res.render('home', { allPosts: plainPosts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  });

module.exports = router;
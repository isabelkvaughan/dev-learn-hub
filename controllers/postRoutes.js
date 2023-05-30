const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    res.render('home', { allPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
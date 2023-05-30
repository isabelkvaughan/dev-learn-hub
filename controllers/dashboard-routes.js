const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// Dashboard route
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  res.render('dashboard', {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;

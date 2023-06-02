const router = require("express").Router();
const { Post, User } = require("../models");

// Posts route
const getHome = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["username"], // Include the username field
      },
    });
    const plainPosts = posts.map((post) => post.get({ plain: true }));
    res.render("home", {
      allPosts: plainPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

// Login route
const getLogin = async (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
};

// Login route
const getSignUp = async (req, res) => {
  res.render("signup", {
    loggedIn: req.session.loggedIn,
  });
};

module.exports = {
  getHome,
  getLogin,
  getSignUp,
};

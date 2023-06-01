const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// Posts route
router.get("/", async (req, res) => {
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
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;

const { Post, User, Comment } = require("../models");

// Render Home
const renderHome = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["username"], // Include the username field
      },
      order: [["createdAt", "DESC"]], // Order posts by createdAt column in descending order
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
const renderLogin = async (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
};

// Login route
const renderSignUp = async (req, res) => {
  res.render("signup", {
    loggedIn: req.session.loggedIn,
  });
};

// Render single post by ID
const renderSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found test 2" });
      return;
    }

    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    const plainPost = post.get({ plain: true });

    // Check if the logged-in user is the owner of the post
    const userId = req.session.user_id;
    const isOwner = plainPost.user.id === userId;

    res.render("singlePost", {
      post: plainPost,
      comments: comments.map((comment) => comment.get({ plain: true })),
      loggedIn: req.session.loggedIn,
      isOwner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
};

module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderSinglePost,
};

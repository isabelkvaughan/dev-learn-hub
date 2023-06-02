const { Post, User } = require("../models");

// Render Dashboard
const renderDashboard = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: {
        model: User,
        attributes: ["username"],
      },
      order: [["createdAt", "DESC"]], // Order posts by createdAt column in descending order
    });

    const postsPlain = posts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      posts: postsPlain, // Pass the retrieved posts to the template
      user: req.session.username, // Pass the username to the template
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

// Render Create Post Form
const renderNew = async (req, res) => {
  try {
    res.render("newPost");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to render create post form" });
  }
};

// Render Edit Form
const renderEdit = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found test" });
      return;
    }

    const plainPost = post.get({ plain: true });

    res.render("editPost", {
      post: plainPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to render edit post form" });
  }
};

module.exports = {
  renderDashboard,
  renderNew,
  renderEdit,
};

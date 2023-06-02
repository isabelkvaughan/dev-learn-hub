const { Post, User } = require("../models");

// Get dashboard
const getDashboard = async (req, res) => {
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

module.exports = {
  getDashboard,
};

const { Post } = require("../models");

// Get dashboard
const getDashboard = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      posts: posts, // Pass the retrieved posts to the template
      user: req.session.username, // Pass the username to the template
      content: req.session.content, // Pass the content to the template
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

module.exports = {
  getDashboard,
};

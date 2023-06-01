const { Post, Comment, User } = require("../models");

// GET post by ID
const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
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
    res.render("singlePost", {
      post: plainPost,
      comments: comments.map((comment) => comment.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
};

// Create a comment for a post
const postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      post_id: postId,
      user_id: req.session.user_id,
    });

    // Respond with the created comment
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

module.exports = {
  getSinglePost,
  postComment,
};

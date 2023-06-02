const { Post, Comment } = require("../../models");

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
  postComment,
};

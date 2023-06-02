const { Post } = require("../../models");

// Create new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create the new post
    const post = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });

    // Respond with the created post
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Edit Post
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.update(
      {
        title,
        content,
      },
      {
        where: { id },
      }
    );
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete the post
    const deletedPost = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
};

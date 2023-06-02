const { Post, Comment, User } = require("../models");

// Render Create Post Form
const newPost = async (req, res) => {
  try {
    res.render("newPost");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to render create post form" });
  }
};

// Create new post
const postPost = async (req, res) => {
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

// Render form to edit or delete post
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
      res.status(404).json({ error: "Post not found" });
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
  newPost,
  postPost,
  getSinglePost,
  postComment,
  renderEdit,
  editPost,
  deletePost,
};

const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// User Routes
router.post("/users", userRoutes.addUser);
router.post("/users/login", userRoutes.userLogin);
router.post("/users/logout", userRoutes.userLogout);

// Post Routes
router.post("/post", postRoutes.createPost);
router.put("/post/:id", postRoutes.editPost);
router.delete("/post/:id", postRoutes.deletePost);

//Comment Routes
router.post("/post/:id", commentRoutes.postComment);

module.exports = router;

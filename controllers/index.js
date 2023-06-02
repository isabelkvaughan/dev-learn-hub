const router = require("express").Router();
const apiRoutes = require("./api");
const homeController = require("./homeController.js");
const dashboardController = require("./dashboardController.js");
const postController = require("./postController.js");
const withAuth = require("../utils/auth");

// API Routes
router.use("/api", apiRoutes);

// Home Routes
router.get("/", homeController.getHome);
router.get("/login", homeController.getLogin);
router.get("/signup", homeController.getSignUp);

// Dashboard Routes
router.get("/dashboard", withAuth, dashboardController.getDashboard);

// Post Routes
router.get("/post/new", withAuth, postController.newPost);
router.post("/post/", withAuth, postController.postPost);
router.get("/post/:id", withAuth, postController.getSinglePost);
router.post("/post/:id", withAuth, postController.postComment);

module.exports = router;

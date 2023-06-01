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
router.get("/login", withAuth, homeController.getLogin);

// Dashboard Routes
router.get("/dashboard", withAuth, dashboardController.getDashboard);

// Post Routes
router.get("/post/:id", withAuth, postController.getSinglePost);
router.post("/post/:id", withAuth, postController.postComment);

module.exports = router;

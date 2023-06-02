const router = require("express").Router();
const apiRoutes = require("./api");
const homeController = require("./homeController.js");
const dashboardController = require("./dashboardController.js");
const withAuth = require("../utils/auth");

// API Routes
router.use("/api", apiRoutes);

// Home Routes
router.get("/", homeController.renderHome);
router.get("/login", homeController.renderLogin);
router.get("/signup", homeController.renderSignUp);
router.get("/post/:id", withAuth, homeController.renderSinglePost);

// Dashboard Routes
router.get("/dashboard", withAuth, dashboardController.renderDashboard);
router.get("/post/new", withAuth, dashboardController.renderNew);
router.get("/post/:id/edit", withAuth, dashboardController.renderEdit);

module.exports = router;

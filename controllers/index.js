const router = require("express").Router();
const apiRoutes = require("./api");
const homeController = require("./homeController.js");
const dashboardController = require("./dashboardController.js");
const postController = require("./postController.js");
const withAuth = require("../utils/auth");

router.use("/api", apiRoutes);
router.use("/", homeController);
router.use("/post", postController);

// Dashboard Routes
router.get("/dashboard", withAuth, dashboardController.getDashboard);

module.exports = router;

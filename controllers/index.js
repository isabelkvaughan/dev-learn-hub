const router = require('express').Router();
const apiRoutes = require('./api');
const postRoutes = require('./postRoutes');

// Use the API routes
router.use('/api', apiRoutes);

// Use the post routes
router.use('/', postRoutes);

module.exports = router;

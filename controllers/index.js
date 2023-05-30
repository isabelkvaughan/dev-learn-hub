const router = require('express').Router();
const apiRoutes = require('./api');

// Use the API routes
router.use('/api', apiRoutes);

// Example route to test
router.get('/', (req, res) => {
  res.render('layouts/main');
  });

  
module.exports = router;

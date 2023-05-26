const router = require('express').Router();
const { User, Post } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Post }],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

module.exports = router;

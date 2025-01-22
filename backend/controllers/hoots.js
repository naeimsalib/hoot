const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const Hoot = require('../models/hoot');
const router = express.Router();

// ✅ Protected: Create a new hoot
router.post('/', verifyToken, ensureLoggedIn, async (req, res) => {
  try {
    req.body.author = req.user.userId; // ✅ Store only the ObjectId
    const hoot = await Hoot.create(req.body);

    // ✅ Populate author field before returning the response
    const populatedHoot = await Hoot.findById(hoot._id).populate(
      'author',
      'username'
    );

    res.status(201).json(populatedHoot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

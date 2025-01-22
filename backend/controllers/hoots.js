const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const ensureLoggedIn = require('../middleware/ensureLoggedIn'); // ✅ Add this
const Hoot = require('../models/hoot');
const router = express.Router();

// ✅ Public: Get all hoots
router.get('/', async (req, res) => {
  try {
    const hoots = await Hoot.find().populate('author', 'username');
    res.json(hoots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Protected: Create a new hoot
router.post('/', verifyToken, ensureLoggedIn, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

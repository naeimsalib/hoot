const Hoot = require('../models/hoot'); // Change import

module.exports = {
  create,
  index,
  show,
  update,
  deleteHoot,
  createComment,
};

// Get all hoots
async function index(req, res) {
  try {
    const hoots = await Hoot.find().populate('author', 'username');
    res.json(hoots);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch hoots' });
  }
}

// Get a single hoot with comments
async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId)
      .populate('author', 'username')
      .populate('comments.author', 'username');
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });
    res.json(hoot);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching hoot' });
  }
}

// Create a new hoot
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    res.json(hoot);
  } catch (err) {
    res.status(400).json({ message: 'Create Hoot Failed' });
  }
}

// Update a hoot (only by author)
async function update(req, res) {
  try {
    const hoot = await Hoot.findOneAndUpdate(
      { _id: req.params.hootId, author: req.user._id },
      req.body,
      { new: true }
    );
    if (!hoot) return res.status(403).json({ message: 'Unauthorized' });
    res.json(hoot);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
}

// Delete a hoot (only by author)
async function deleteHoot(req, res) {
  try {
    const hoot = await Hoot.findOneAndDelete({
      _id: req.params.hootId,
      author: req.user._id,
    });
    if (!hoot) return res.status(403).json({ message: 'Unauthorized' });
    res.json({ message: 'Hoot deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
}

// Add a comment to a hoot
async function createComment(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });

    const comment = { text: req.body.text, author: req.user._id };
    hoot.comments.push(comment);
    await hoot.save();

    res.json(hoot);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add comment' });
  }
}

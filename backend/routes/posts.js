const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/posts'); // Now referring to hoots controller
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// CRUD routes for hoots
router.post('/', ensureLoggedIn, hootsCtrl.create); // Create hoot
router.get('/', hootsCtrl.index); // Get all hoots
router.get('/:hootId', hootsCtrl.show); // Get a single hoot
router.put('/:hootId', ensureLoggedIn, hootsCtrl.update); // Update hoot
router.delete('/:hootId', ensureLoggedIn, hootsCtrl.deleteHoot); // Delete hoot

// Comments route
router.post('/:hootId/comments', ensureLoggedIn, hootsCtrl.createComment); // Add comment to hoot

module.exports = router;

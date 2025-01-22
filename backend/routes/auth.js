const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

// All paths start with '/api/auth'

// POST /api/auth/signup
router.post('/sign-up', authCtrl.signUp);
// POST /api/auth/login
router.post('/log-in', authCtrl.logIn);

module.exports = router;

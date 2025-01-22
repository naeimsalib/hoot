const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();
const hootsRouter = require('./controllers/hoots');

// Process the secrets/config vars in .env
require('dotenv').config();

// Connect to the database
require('./db');

app.use(logger('dev'));
// Serve static assets from the frontend's built code folder (dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Parse JSON request bodies
app.use(express.json());

// ✅ Check & verify token (but don't force authentication for all routes)
app.use(require('./middleware/verifyToken')); // ✅ Renamed from checkToken.js

// API Routes (Auth doesn't need authentication)
app.use('/api/auth', require('./routes/auth'));

// ✅ Do NOT globally apply `ensureLoggedIn` here, instead protect individual routes inside `hootsRouter`
app.use('/api/hoots', hootsRouter);

// Use a "catch-all" route to deliver the frontend's production index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});

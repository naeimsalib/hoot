const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  req.user = null;

  if (!token) {
    console.log('❌ No token provided'); // Debugging log
    return next();
  }

  token = token.replace('Bearer ', '');
  console.log('✅ Extracted Token:', token); // Debugging log

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      console.log('❌ Token verification failed:', err.message); // Debugging log
      return next();
    }

    console.log('✅ Token Verified! User Data:', decoded);
    req.user = decoded;
    next();
  });
};

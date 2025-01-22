module.exports = function (req, res, next) {
  if (req.user) {
    console.log('✅ User is authenticated:', req.user);
    return next();
  }
  console.log('❌ Unauthorized request - no user found in request');
  res.status(401).json({ message: 'Unauthorized' });
};

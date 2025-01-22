const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  signUp,
  logIn,
};

async function logIn(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }); // ✅ Fix field name
    if (!user) throw new Error();

    const match = await bcrypt.compare(req.body.password, user.hashedPassword); // ✅ Fix field name
    if (!match) throw new Error();

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Bad Credentials' });
  }
}

async function signUp(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      hashedPassword,
    });

    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Sign-up Failed' });
  }
}

/*--- Helper Function ---*/
function createJWT(user) {
  return jwt.sign(
    { userId: user._id, username: user.username },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

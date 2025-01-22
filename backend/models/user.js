const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.hashedPassword;
        return ret;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('hashedPassword')) return next();
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, SALT_ROUNDS);
  next();
});

module.exports = mongoose.model('User', userSchema);

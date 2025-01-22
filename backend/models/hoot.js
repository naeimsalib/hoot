const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Comment Schema (Embedded in Hoot)
const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Define Hoot Schema
const hootSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true }, // Changed from "content" to "text"
    category: {
      type: String,
      required: true,
      enum: ['News', 'Sports', 'Games', 'Movies', 'Music', 'Television'],
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [commentSchema], // Embedded commentSchema
  },
  { timestamps: true }
);

// Register and export the model
const Hoot = mongoose.model('Hoot', hootSchema);
module.exports = Hoot;

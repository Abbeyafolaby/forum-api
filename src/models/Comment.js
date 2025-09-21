import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);

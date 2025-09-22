import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    votes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        value: { type: Number, enum: [1, -1], required: true },
        _id: false,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

commentSchema.virtual('score').get(function () {
  if (!this.votes) return 0;
  return this.votes.reduce((sum, v) => sum + (v.value || 0), 0);
});

export default mongoose.model('Comment', commentSchema);

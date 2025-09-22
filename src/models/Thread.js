import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 200 },
    body: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

// Virtual to compute score quickly
threadSchema.virtual('score').get(function () {
  if (!this.votes) return 0;
  return this.votes.reduce((sum, v) => sum + (v.value || 0), 0);
});

export default mongoose.model('Thread', threadSchema);

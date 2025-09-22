import Thread from '../models/Thread.js';
import Comment from '../models/Comment.js';

// POST /threads/:id/comments
export async function addCommentToThread(req, res, next) {
  try {
    const { id } = req.params; // thread id
    const { content } = req.body || {};
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const thread = await Thread.findById(id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    const comment = await Comment.create({
      thread: id,
      author: req.user.id,
      content: content.trim(),
      parent: null
    });

    const populated = await comment.populate('author', 'name email');
    return res.status(201).json({ comment: populated });
  } catch (err) {
    return next(err);
  }
}

// POST /comments/:id/reply
export async function replyToComment(req, res, next) {
  try {
    const { id } = req.params; // parent comment id
    const { content } = req.body || {};
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const parent = await Comment.findById(id);
    if (!parent) return res.status(404).json({ message: 'Parent comment not found' });

    const reply = await Comment.create({
      thread: parent.thread,
      author: req.user.id,
      content: content.trim(),
      parent: parent._id
    });

    const populated = await reply.populate('author', 'name email');
    return res.status(201).json({ comment: populated });
  } catch (err) {
    return next(err);
  }
}

// POST /comments/:id/vote
export async function voteComment(req, res, next) {
  try {
    const { id } = req.params; // comment id
    let { value } = req.body || {};
    value = Number(value);
    if (![1, -1].includes(value)) {
      return res.status(400).json({ message: 'Value must be 1 or -1' });
    }

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const userId = req.user.id;
    if (!comment.votes) comment.votes = [];
    const existing = comment.votes.find((v) => String(v.user) === String(userId));

    if (existing) {
      if (existing.value === value) {
        return res.status(400).json({ message: 'You have already cast this vote' });
      }
      existing.value = value;
    } else {
      comment.votes.push({ user: userId, value });
    }

    await comment.save();
    const score = comment.votes.reduce((sum, v) => sum + (v.value || 0), 0);
    return res.status(200).json({ commentId: comment._id, score, userVote: value });
  } catch (err) {
    return next(err);
  }
}

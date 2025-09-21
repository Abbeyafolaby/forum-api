import Thread from '../models/Thread.js';
import Comment from '../models/Comment.js';

// POST /threads
export async function createThread(req, res, next) {
  try {
    const { title, body } = req.body || {};
    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const thread = await Thread.create({ title, body, author: req.user.id });
    return res.status(201).json({ thread });
  } catch (err) {
    return next(err);
  }
}

// GET /threads
export async function listThreads(_req, res, next) {
  try {
    const threads = await Thread.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email')
      .exec();
    return res.json({ threads });
  } catch (err) {
    return next(err);
  }
}

function buildCommentTree(comments) {
  const byId = new Map();
  comments.forEach((c) => {
    byId.set(String(c._id), { ...c, children: [] });
  });
  const roots = [];
  byId.forEach((c) => {
    if (c.parent) {
      const parent = byId.get(String(c.parent));
      if (parent) parent.children.push(c);
      else roots.push(c); // orphan fallback
    } else {
      roots.push(c);
    }
  });
  return roots;
}

// GET /threads/:id
export async function getThread(req, res, next) {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id).populate('author', 'name email');
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    const comments = await Comment.find({ thread: id })
      .populate('author', 'name email')
      .lean()
      .exec();

    const tree = buildCommentTree(comments);

    return res.json({ thread, comments: tree });
  } catch (err) {
    return next(err);
  }
}

// DELETE /threads/:id (admin only)
export async function deleteThread(req, res, next) {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    await Comment.deleteMany({ thread: id });
    await thread.deleteOne();

    return res.status(200).json({ message: 'Thread deleted' });
  } catch (err) {
    return next(err);
  }
}

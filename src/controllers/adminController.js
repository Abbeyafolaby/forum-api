import Thread from '../models/Thread.js';
import Comment from '../models/Comment.js';

// GET /admin/threads
export async function listAllThreads(req, res, next) {
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

// DELETE /admin/comments/:id
export async function deleteCommentCascade(req, res, next) {
  try {
    const { id } = req.params;
    const root = await Comment.findById(id);
    if (!root) return res.status(404).json({ message: 'Comment not found' });

    // Collect all descendant comment IDs (BFS)
    const toDelete = [root._id];
    let frontier = [root._id];
    while (frontier.length > 0) {
      const children = await Comment.find({ parent: { $in: frontier } }).select('_id');
      if (children.length === 0) break;
      const childIds = children.map((c) => c._id);
      toDelete.push(...childIds);
      frontier = childIds;
    }

    const result = await Comment.deleteMany({ _id: { $in: toDelete } });
    return res.status(200).json({ message: 'Comment(s) deleted', deletedCount: result.deletedCount });
  } catch (err) {
    return next(err);
  }
}


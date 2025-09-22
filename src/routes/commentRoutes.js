import express from 'express';
import auth from '../middleware/auth.js';
import { replyToComment, voteComment } from '../controllers/commentController.js';

const router = express.Router();

// Reply to a comment
router.post('/:id/reply', auth, replyToComment);

// Vote on a comment
router.post('/:id/vote', auth, voteComment);

export default router;

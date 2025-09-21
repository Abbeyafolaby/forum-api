import express from 'express';
import auth from '../middleware/auth.js';
import { replyToComment } from '../controllers/commentController.js';

const router = express.Router();

// Reply to a comment
router.post('/:id/reply', auth, replyToComment);

export default router;


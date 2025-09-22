import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import { createThread, listThreads, getThread, deleteThread, voteThread } from '../controllers/threadController.js';
import { addCommentToThread } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', auth, createThread);
router.get('/', listThreads);
router.get('/:id', getThread);
router.delete('/:id', auth, admin, deleteThread);

// Comments on a thread
router.post('/:id/comments', auth, addCommentToThread);

// Vote on a thread
router.post('/:id/vote', auth, voteThread);

export default router;

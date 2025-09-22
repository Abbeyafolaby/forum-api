import express from 'express';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';
import { listAllThreads, deleteCommentCascade } from '../controllers/adminController.js';

const router = express.Router();

// Admin: list all threads
router.get('/threads', auth, roleCheck('admin'), listAllThreads);

// Admin: delete a comment (and its replies)
router.delete('/comments/:id', auth, roleCheck('admin'), deleteCommentCascade);

export default router;


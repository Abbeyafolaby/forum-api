import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import { createThread, listThreads, getThread, deleteThread } from '../controllers/threadController.js';

const router = express.Router();

router.post('/', auth, createThread);
router.get('/', listThreads);
router.get('/:id', getThread);
router.delete('/:id', auth, admin, deleteThread);

export default router;

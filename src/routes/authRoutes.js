import express from 'express';
import { signup, login } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Example protected route: get current user profile
router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

export default router;

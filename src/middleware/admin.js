import User from '../models/User.js';

async function admin(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const isAdmin = user.role === 'admin' || user.isAdmin === true;
    if (!isAdmin) return res.status(403).json({ message: 'Admin access required' });

    return next();
  } catch (err) {
    return next(err);
  }
}

export default admin;

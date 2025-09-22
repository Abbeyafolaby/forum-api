import User from '../models/User.js';

function roleCheck(requiredRole) {
  return async function (req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });

      const user = await User.findById(userId);
      if (!user) return res.status(401).json({ message: 'Unauthorized' });

      const isAdmin = user.role === 'admin' || user.isAdmin === true;
      const ok = requiredRole === 'admin' ? isAdmin : user.role === requiredRole;
      if (!ok) return res.status(403).json({ message: `${requiredRole} access required` });

      return next();
    } catch (err) {
      return next(err);
    }
  };
}

export default roleCheck;


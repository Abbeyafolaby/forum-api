import jwt from 'jsonwebtoken';
import User from '../models/User.js';


function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name },
    secret,
    { expiresIn }
  );
}

// POST /auth/signup
async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Resolve role safely: only 'admin' or 'user'; default to 'user'
    const resolvedRole = role === 'admin' ? 'admin' : 'user';

    const user = await User.create({
      name,
      email,
      password,
      role: resolvedRole,
    });
    const token = signToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
}

// POST /auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    return next(err);
  }
}

export { signup, login };

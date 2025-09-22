import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import threadRoutes from './routes/threadRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/threads', threadRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);

// 404 handler
app.use((req, res, _next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

export default app;

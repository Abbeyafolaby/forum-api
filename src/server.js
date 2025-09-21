import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start server
await connectDB();

app.listen(PORT, () => {
  console.log(`Forum API server running at http://localhost:${PORT}`);
});


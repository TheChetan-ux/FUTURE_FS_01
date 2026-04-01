import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB, { getLastDatabaseError, isDatabaseReady } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const hasFrontendBuild = fs.existsSync(frontendDistPath);

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Mini CRM API is running' });
});

app.get('/api/db-health', async (_req, res) => {
  if (!isDatabaseReady()) {
    try {
      await connectDB();
    } catch (_error) {
      // The latest DB error is exposed in the response below.
    }
  }

  const databaseReady = isDatabaseReady();

  res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    databaseReady,
    error: databaseReady ? null : getLastDatabaseError(),
  });
});

app.use('/api', (req, res, next) => {
  if (req.path === '/health' || req.path === '/db-health') {
    next();
    return;
  }

  if (isDatabaseReady()) {
    next();
    return;
  }

  connectDB()
    .then(() => next())
    .catch(() => {
      res.status(503).json({
        success: false,
        message: 'Database is not connected. Check MONGODB_URI and MongoDB Atlas network access.',
        error: getLastDatabaseError(),
      });
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/tasks', taskRoutes);

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }

    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;

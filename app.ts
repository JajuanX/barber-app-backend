import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import quizRoutes from './routes/quiz.routes';
import questionRoutes from './routes/questions.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from './routes/analytics.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Core middleware
// CORS: allow configured frontend origins; allow Vercel domains and localhost in dev
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS;
const FRONTEND_DOMAIN_SUFFIXES = (process.env.FRONTEND_DOMAIN_SUFFIXES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const devOrigins = ['http://localhost:5173'];
const allowed = new Set<string>();
if (FRONTEND_ORIGINS) {
  FRONTEND_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean).forEach((o) => allowed.add(o));
}
if (FRONTEND_ORIGIN) allowed.add(FRONTEND_ORIGIN);
if (process.env.NODE_ENV !== 'production') devOrigins.forEach((o) => allowed.add(o));

app.use(
  cors({
    origin: (origin, callback) => {
      // allow same-origin / curl with no origin header
      if (!origin) return callback(null, true);
      if (allowed.has(origin)) return callback(null, true);
      // Allow any Vercel deployment domain (prod + previews)
      try {
        const { hostname } = new URL(origin);
        if (hostname.endsWith('.vercel.app')) return callback(null, true);
        // Allow custom domains by suffix, e.g., sbp-barber.com (matches apex and subdomains)
        if (
          FRONTEND_DOMAIN_SUFFIXES.some(
            (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`)
          )
        )
          return callback(null, true);
      } catch {}
      // Fallback: if no explicit FRONTEND_ORIGIN configured, be permissive
      if (!FRONTEND_ORIGIN) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Error handler must be last
app.use(errorHandler);

export default app;

// Utility to connect to Mongo when server starts (used by server.ts)
export async function connectToDatabase(uri: string) {
  await mongoose.connect(uri);
}

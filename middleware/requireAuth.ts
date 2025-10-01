import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface UserPayload {
      _id: mongoose.Types.ObjectId;
      role?: 'admin' | 'student';
    }
    interface Request {
      user?: UserPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export function requireAuth(role?: 'admin' | 'student') {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.header('authorization') || req.header('Authorization');
    if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid Authorization header' });
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.user = { _id: new mongoose.Types.ObjectId(payload._id), role: payload.role };
      if (role && req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch (_e) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

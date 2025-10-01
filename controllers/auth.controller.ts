import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'dev_secret_change_me') as Secret;
const JWT_EXPIRES = (process.env.JWT_EXPIRES || '7d') as unknown as SignOptions['expiresIn'];

function signToken(payload: Record<string, unknown>) {
  const options: SignOptions = { expiresIn: JWT_EXPIRES };
  return jwt.sign(payload, JWT_SECRET, options);
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, password } = req.body as { email: string; name: string; password: string };
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    // Public registration always creates a student account
    const user = await User.create({ email, name, role: 'student', passwordHash });
    const token = signToken({ _id: user._id, role: user.role, email: user.email, name: user.name });
    return res.status(201).json({ message: 'Registered', data: { token, user: { _id: user._id, email: user.email, name: user.name, role: user.role } } });
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken({ _id: user._id, role: user.role, email: user.email, name: user.name });
    return res.status(200).json({ message: 'OK', data: { token, user: { _id: user._id, email: user.email, name: user.name, role: user.role } } });
  } catch (err) {
    return next(err);
  }
}

export async function me(req: Request, res: Response) {
  const user = req.user!;
  return res.status(200).json({ message: 'OK', data: user });
}

import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

// GET /api/admin/users?role=student
export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const role = (req.query.role as 'admin' | 'student' | undefined) || undefined;
    const query: any = {};
    if (role) query.role = role;
    const users = await User.find(query).select('_id name email role createdAt').sort({ name: 1 }).lean();
    return res.status(200).json({ message: 'OK', data: users });
  } catch (err) {
    return next(err);
  }
}

// POST /api/admin/users  { name, email, password, role }
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: 'admin' | 'student' };
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role || 'student' });
    return res.status(201).json({ message: 'Created', data: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return next(err);
  }
}

// PATCH /api/admin/users/:id/role  { role }
export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { role } = req.body as { role: 'admin' | 'student' };
    if (!role) return res.status(400).json({ message: 'Role required' });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    return res.status(200).json({ message: 'Updated', data: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return next(err);
  }
}

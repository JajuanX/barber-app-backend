import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { listUsers, createUser, updateUserRole } from '../controllers/admin.controller';

const router = Router();

router.get('/users', requireAuth('admin'), listUsers);
router.post('/users', requireAuth('admin'), createUser);
router.patch('/users/:id/role', requireAuth('admin'), updateUserRole);

export default router;

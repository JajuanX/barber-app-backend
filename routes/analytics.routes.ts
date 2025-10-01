import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { analyticsOverview, analyticsByCategory, studentStats } from '../controllers/analytics.controller';

const router = Router();

router.get('/overview', requireAuth('admin'), analyticsOverview);
router.get('/categories', requireAuth('admin'), analyticsByCategory);
router.get('/student-stats', requireAuth('admin'), studentStats);

export default router;

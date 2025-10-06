import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { analyticsOverview, analyticsByCategory, studentStats, myOverview, myCategories, myStats } from '../controllers/analytics.controller';

const router = Router();

router.get('/overview', requireAuth('admin'), analyticsOverview);
router.get('/categories', requireAuth('admin'), analyticsByCategory);
router.get('/student-stats', requireAuth('admin'), studentStats);

// Student self-serve analytics
router.get('/me/overview', requireAuth(), myOverview);
router.get('/me/categories', requireAuth(), myCategories);
router.get('/me/summary', requireAuth(), myStats);

export default router;

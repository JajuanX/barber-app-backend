import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { startQuiz, submitQuiz, myHistory, allAttempts, attemptDetail } from '../controllers/quiz.controller';

const router = Router();

router.post('/start', requireAuth('student'), startQuiz);
router.post('/submit', requireAuth('student'), submitQuiz);
router.get('/history', requireAuth('student'), myHistory);
router.get('/attempts', requireAuth('admin'), allAttempts);
router.get('/attempts/:id', requireAuth(), attemptDetail);

export default router;

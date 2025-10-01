import { Router } from 'express';
import { createQuestion, listQuestions, deleteQuestion, updateQuestion } from '../controllers/questions.controller';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.post('/', requireAuth('admin'), createQuestion);
router.get('/', requireAuth('admin'), listQuestions);
router.put('/:id', requireAuth('admin'), updateQuestion);
router.delete('/:id', requireAuth('admin'), deleteQuestion);

export default router;

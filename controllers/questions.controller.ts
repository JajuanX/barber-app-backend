import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question';

// POST /api/questions
export async function createQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, text, options, correctKey, explanation } = req.body;
    const createdBy = req.user?._id as mongoose.Types.ObjectId;

    const question = await Question.create({ category, text, options, correctKey, explanation, createdBy });
    return res.status(201).json({ message: 'Question created', data: question });
  } catch (err) {
    return next(err);
  }
}

// GET /api/questions
export async function listQuestions(_req: Request, res: Response, next: NextFunction) {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: 'OK', data: questions });
  } catch (err) {
    return next(err);
  }
}

// PUT /api/questions/:id
export async function updateQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { category, text, options, correctKey, explanation } = req.body;
    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: 'Not found' });

    q.category = category ?? q.category;
    q.text = text ?? q.text;
    q.options = options ?? q.options;
    q.correctKey = correctKey ?? q.correctKey;
    q.explanation = explanation ?? q.explanation;
    await q.save();

    return res.status(200).json({ message: 'Updated', data: q });
  } catch (err) {
    return next(err);
  }
}

// DELETE /api/questions/:id
export async function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const q = await Question.findByIdAndDelete(id);
    if (!q) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ message: 'Deleted', data: q });
  } catch (err) {
    return next(err);
  }
}

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question';
import QuizAttempt from '../models/QuizAttempt';

// POST /api/quiz/start => returns 50 random questions, optionally filtered by category
export async function startQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = 50;
    const category = (req.body?.category as string | undefined) || undefined;
    const match: any = category ? { category } : {};

    const count = await Question.countDocuments(match);
    if (count === 0) return res.status(400).json({ message: 'No questions available for the selected category' });

    const sampleSize = Math.min(limit, count);
    const pipeline: any[] = [];
    if (category) pipeline.push({ $match: match });
    pipeline.push({ $sample: { size: sampleSize } });
    const questions = await Question.aggregate(pipeline);

    const questionIds = questions.map((q: any) => q._id);
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const attempt = await QuizAttempt.create({ userId, questionIds, answers: [], score: 0, submitted: false });

    // Return without revealing correct answers
    const sanitized = questions.map((q: any) => ({
      _id: q._id,
      category: q.category,
      text: q.text,
      options: q.options,
    }));
    return res.status(201).json({ message: 'Quiz started', data: { attemptId: attempt._id, questions: sanitized } });
  } catch (err) {
    return next(err);
  }
}

// POST /api/quiz/submit => grade answers for attempt
export async function submitQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const { attemptId, answers } = req.body as {
      attemptId: string;
      answers: { questionId: string; selectedKey: string }[];
    };

    const attempt = await QuizAttempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

    // Ensure the attempt belongs to the user
    if (!attempt.userId.equals(req.user!._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Build a map of provided answers for quick lookup
    const providedMap = new Map(
      (answers || []).map((a) => [a.questionId.toString(), a.selectedKey])
    );

    // Load all questions in the attempt to grade answered and unanswered
    const allIds = attempt.questionIds.map((id) => id as mongoose.Types.ObjectId);
    const questions = await Question.find({ _id: { $in: allIds } }).lean();
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    const graded = allIds.map((qid) => {
      const q = questionMap.get(qid.toString());
      const selectedKey = providedMap.get(qid.toString()) || '';
      const isCorrect = q ? q.correctKey === selectedKey && selectedKey !== '' : false;
      return {
        questionId: qid,
        selectedKey,
        isCorrect,
      };
    });

    const score = graded.filter((g) => g.isCorrect).length;
    // Store only answered items to satisfy schema `selectedKey` requirement
    const answeredOnly = graded.filter((g) => g.selectedKey);
    attempt.answers = answeredOnly as any;
    attempt.score = score;
    attempt.submitted = true;
    await attempt.save();

    // Build feedback per question
    const feedback = graded.map((g) => {
      const q = questionMap.get(g.questionId.toString());
      return {
        questionId: g.questionId,
        text: q?.text ?? '(Question not found)',
        category: q?.category ?? 'Unknown',
        selectedKey: g.selectedKey,
        correctKey: q?.correctKey ?? '',
        explanation: q?.explanation,
        options: q?.options ?? [],
        isCorrect: g.isCorrect,
      };
    });

    return res.status(200).json({
      message: 'Quiz graded',
      data: { score, total: attempt.questionIds.length, feedback },
    });
  } catch (err) {
    return next(err);
  }
}

// GET /api/quiz/history - current user's attempts
export async function myHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user!._id, submitted: true })
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({ message: 'OK', data: attempts });
  } catch (err) {
    return next(err);
  }
}

// GET /api/quiz/attempts - admin view of all attempts
export async function allAttempts(_req: Request, res: Response, next: NextFunction) {
  try {
    const attempts = await QuizAttempt.find({ submitted: true }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: 'OK', data: attempts });
  } catch (err) {
    return next(err);
  }
}

// GET /api/quiz/attempts/:id - detailed feedback for owner or admin
export async function attemptDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const wrongOnly = (req.query.wrongOnly ?? 'true').toString() !== 'false';

    const attempt = await QuizAttempt.findById(id).lean();
    if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

    const isOwner = new mongoose.Types.ObjectId(attempt.userId).equals(req.user!._id);
    const isAdmin = req.user?.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' });

    // Build feedback over all questions in the attempt, including unanswered
    const qIds = attempt.questionIds as mongoose.Types.ObjectId[];
    const questions = await Question.find({ _id: { $in: qIds } }).lean();
    const qMap = new Map(questions.map((q) => [q._id.toString(), q]));

    const ansMap = new Map(
      (attempt.answers || []).map((a) => [a.questionId.toString(), a])
    );

    let feedback = qIds.map((qid) => {
      const q = qMap.get(qid.toString());
      const a = ansMap.get(qid.toString());
      const selectedKey = a?.selectedKey || '';
      const isCorrect = a?.isCorrect ?? (q ? q.correctKey === selectedKey && selectedKey !== '' : false);
      return {
        questionId: qid,
        text: q?.text,
        category: q?.category,
        options: q?.options ?? [],
        selectedKey,
        correctKey: q?.correctKey,
        explanation: q?.explanation,
        isCorrect,
      };
    });

    if (wrongOnly) feedback = feedback.filter((f) => !f.isCorrect);

    return res.status(200).json({
      message: 'OK',
      data: { attemptId: attempt._id, score: attempt.score, total: attempt.questionIds.length, submitted: attempt.submitted, feedback },
    });
  } catch (err) {
    return next(err);
  }
}

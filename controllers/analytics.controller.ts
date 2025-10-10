import { Request, Response, NextFunction } from 'express';
import QuizAttempt from '../models/QuizAttempt';
import Question from '../models/Question';
import mongoose from 'mongoose';
import User from '../models/User';

// GET /api/analytics/overview
export async function analyticsOverview(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string | undefined;
    const match: any = { submitted: true };
    if (userId && mongoose.isValidObjectId(userId)) match.userId = new mongoose.Types.ObjectId(userId);

    const [result] = await QuizAttempt.aggregate([
      { $match: match },
      {
        $project: {
          score: 1,
          total: { $size: '$questionIds' },
          percent: { $multiply: [{ $divide: ['$score', { $size: '$questionIds' }] }, 100] },
        },
      },
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalAttempts: { $sum: 1 },
                avgScore: { $avg: '$score' },
                avgPercent: { $avg: '$percent' },
              },
            },
          ],
          distribution: [
            {
              $project: {
                bucket: { $multiply: [{ $floor: { $divide: ['$percent', 10] } }, 10] },
              },
            },
            { $group: { _id: '$bucket', count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    const overview = (result?.overview?.[0] as any) || { totalAttempts: 0, avgScore: 0, avgPercent: 0 };
    const distribution = (result?.distribution as any[]) || [];
    return res.status(200).json({ message: 'OK', data: { overview, distribution } });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/me/overview
export async function myOverview(req: Request, res: Response, next: NextFunction) {
  try {
    // Force match to current user
    const match: any = { submitted: true, userId: req.user!._id };
    const [result] = await QuizAttempt.aggregate([
      { $match: match },
      {
        $project: {
          score: 1,
          total: { $size: '$questionIds' },
          percent: { $multiply: [{ $divide: ['$score', { $size: '$questionIds' }] }, 100] },
        },
      },
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalAttempts: { $sum: 1 },
                avgScore: { $avg: '$score' },
                avgPercent: { $avg: '$percent' },
              },
            },
          ],
          distribution: [
            {
              $project: {
                bucket: { $multiply: [{ $floor: { $divide: ['$percent', 10] } }, 10] },
              },
            },
            { $group: { _id: '$bucket', count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);
    const overview = (result?.overview?.[0] as any) || { totalAttempts: 0, avgScore: 0, avgPercent: 0 };
    const distribution = (result?.distribution as any[]) || [];
    return res.status(200).json({ message: 'OK', data: { overview, distribution } });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/categories
export async function analyticsByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string | undefined;
    const match: any = { submitted: true };
    if (userId && mongoose.isValidObjectId(userId)) match.userId = new mongoose.Types.ObjectId(userId);

    const rows = await QuizAttempt.aggregate([
      { $match: match },
      { $unwind: '$answers' },
      {
        $lookup: {
          from: Question.collection.name,
          localField: 'answers.questionId',
          foreignField: '_id',
          as: 'q',
        },
      },
      { $unwind: '$q' },
      {
        $group: {
          _id: '$q.category',
          total: { $sum: 1 },
          correct: { $sum: { $cond: ['$answers.isCorrect', 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          total: 1,
          correct: 1,
          accuracy: {
            $cond: [
              { $gt: ['$total', 0] },
              { $multiply: [{ $divide: ['$correct', '$total'] }, 100] },
              0,
            ],
          },
        },
      },
      { $sort: { category: 1 } },
    ]);

    return res.status(200).json({ message: 'OK', data: rows });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/me/categories
export async function myCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await QuizAttempt.aggregate([
      { $match: { submitted: true, userId: req.user!._id } },
      { $unwind: '$answers' },
      {
        $lookup: {
          from: Question.collection.name,
          localField: 'answers.questionId',
          foreignField: '_id',
          as: 'q',
        },
      },
      { $unwind: '$q' },
      {
        $group: {
          _id: '$q.category',
          total: { $sum: 1 },
          correct: { $sum: { $cond: ['$answers.isCorrect', 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          total: 1,
          correct: 1,
          accuracy: {
            $cond: [
              { $gt: ['$total', 0] },
              { $multiply: [{ $divide: ['$correct', '$total'] }, 100] },
              0,
            ],
          },
        },
      },
      { $sort: { category: 1 } },
    ]);
    return res.status(200).json({ message: 'OK', data: rows });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/student-stats?userId=...
export async function studentStats(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string | undefined;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const uid = new mongoose.Types.ObjectId(userId);
    const last = await QuizAttempt.findOne({ userId: uid, submitted: true }).sort({ createdAt: -1 }).lean();
    const best = await QuizAttempt.findOne({ userId: uid, submitted: true }).sort({ score: -1, createdAt: -1 }).lean();

    const toDto = (a: any) =>
      a
        ? {
            score: a.score,
            total: a.questionIds?.length || 0,
            percent: a.questionIds?.length ? (a.score / a.questionIds.length) * 100 : 0,
            createdAt: a.createdAt,
          }
        : undefined;

    return res.status(200).json({ message: 'OK', data: { last: toDto(last), best: toDto(best) } });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/me/summary
export async function myStats(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.user!._id;
    const last = await QuizAttempt.findOne({ userId: uid, submitted: true }).sort({ createdAt: -1 }).lean();
    const best = await QuizAttempt.findOne({ userId: uid, submitted: true }).sort({ score: -1, createdAt: -1 }).lean();
    const toDto = (a: any) =>
      a
        ? {
            score: a.score,
            total: a.questionIds?.length || 0,
            percent: a.questionIds?.length ? (a.score / a.questionIds.length) * 100 : 0,
            createdAt: a.createdAt,
          }
        : undefined;
    return res.status(200).json({ message: 'OK', data: { last: toDto(last), best: toDto(best) } });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/top-students
export async function topStudents(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await QuizAttempt.aggregate([
      { $match: { submitted: true } },
      {
        $project: {
          userId: 1,
          score: 1,
          percent: { $multiply: [{ $divide: ['$score', { $size: '$questionIds' }] }, 100] },
        },
      },
      {
        $group: {
          _id: '$userId',
          avgPercent: { $avg: '$percent' },
          attempts: { $sum: 1 },
        },
      },
      { $sort: { avgPercent: -1, attempts: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: User.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$user.name',
          email: '$user.email',
          avgPercent: { $round: ['$avgPercent', 2] },
          attempts: 1,
        },
      },
    ]);
    return res.status(200).json({ message: 'OK', data: rows });
  } catch (err) {
    return next(err);
  }
}

// GET /api/analytics/last-attempts?userId=...
export async function lastAttempts(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.userId as string | undefined;
    const match: any = { submitted: true };
    const includeUser = !userId || !mongoose.isValidObjectId(userId);
    if (userId && mongoose.isValidObjectId(userId)) {
      match.userId = new mongoose.Types.ObjectId(userId);
    }

    const pipeline: any[] = [
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $project: {
          userId: 1,
          score: 1,
          total: { $size: '$questionIds' },
          percent: { $multiply: [{ $divide: ['$score', { $size: '$questionIds' }] }, 100] },
          createdAt: 1,
        },
      },
    ];

    if (includeUser) {
      pipeline.push(
        {
          $lookup: {
            from: User.collection.name,
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            userId: 1,
            name: '$user.name',
            email: '$user.email',
            score: 1,
            total: 1,
            percent: { $round: ['$percent', 2] },
            createdAt: 1,
          },
        }
      );
    } else {
      pipeline.push({ $project: { email: 0 } });
    }

    const rows = await QuizAttempt.aggregate(pipeline);
    return res.status(200).json({ message: 'OK', data: rows });
  } catch (err) {
    return next(err);
  }
}

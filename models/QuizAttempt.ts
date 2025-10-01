import mongoose, { Schema, Document } from 'mongoose';

export interface AttemptAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedKey: string;
  isCorrect: boolean;
}

export interface QuizAttemptDoc extends Document {
  userId: mongoose.Types.ObjectId;
  questionIds: mongoose.Types.ObjectId[];
  answers: AttemptAnswer[];
  score: number; // 0..questionIds.length
  submitted: boolean;
}

const AttemptAnswerSchema = new Schema<AttemptAnswer>({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedKey: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuizAttemptSchema = new Schema<QuizAttemptDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question', required: true }],
    answers: { type: [AttemptAnswerSchema], default: [] },
    score: { type: Number, default: 0 },
    submitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<QuizAttemptDoc>('QuizAttempt', QuizAttemptSchema);

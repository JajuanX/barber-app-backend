import mongoose, { Schema, Document } from 'mongoose';

export type QuestionOption = {
  key: string; // e.g., 'A', 'B', 'C', 'D'
  text: string;
};

export interface QuestionDoc extends Document {
  category: string; // e.g., Safety, Laws
  text: string;
  options: QuestionOption[];
  correctKey: string; // e.g., 'A'
  explanation?: string;
  createdBy: mongoose.Types.ObjectId;
}

const OptionSchema = new Schema<QuestionOption>({
  key: { type: String, required: true },
  text: { type: String, required: true },
});

const QuestionSchema = new Schema<QuestionDoc>(
  {
    category: { type: String, required: true, index: true },
    text: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    correctKey: { type: String, required: true },
    explanation: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<QuestionDoc>('Question', QuestionSchema);


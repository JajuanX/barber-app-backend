import mongoose, { Schema, Document } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  name: string;
  role: 'admin' | 'student';
  passwordHash: string;
}

const UserSchema = new Schema<UserDoc>({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<UserDoc>('User', UserSchema);


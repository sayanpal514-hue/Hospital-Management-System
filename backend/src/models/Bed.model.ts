import mongoose, { Schema, Document } from 'mongoose';

export interface IBed extends Document {
  ward: string;
  room: string;
  number: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Reserved';
  patientId?: mongoose.Types.ObjectId;
  admittedAt?: Date;
}

const BedSchema = new Schema<IBed>({
  ward: { type: String, required: true, index: true },
  room: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Available', 'Occupied', 'Cleaning', 'Reserved'], default: 'Available', index: true },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
  admittedAt: Date,
}, { timestamps: true });

export const Bed = mongoose.model<IBed>('Bed', BedSchema);

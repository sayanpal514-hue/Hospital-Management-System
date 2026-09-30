import mongoose, { Schema, Document } from 'mongoose';

export interface ILabOrder extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  tests: string[];
  priority: 'Routine' | 'Urgent' | 'STAT';
  status: 'Ordered' | 'Sample Collected' | 'In Progress' | 'Completed' | 'Cancelled';
  results?: string;
  notes?: string;
}

const LabOrderSchema = new Schema<ILabOrder>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tests: [{ type: String }],
  priority: { type: String, enum: ['Routine', 'Urgent', 'STAT'], default: 'Routine' },
  status: { type: String, enum: ['Ordered', 'Sample Collected', 'In Progress', 'Completed', 'Cancelled'], default: 'Ordered', index: true },
  results: String,
  notes: String,
}, { timestamps: true });

export const LabOrder = mongoose.model<ILabOrder>('LabOrder', LabOrderSchema);

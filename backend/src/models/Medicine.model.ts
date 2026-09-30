import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
  name: string;
  genericName?: string;
  category?: string;
  batch: string;
  expiry: Date;
  stock: number;
  price: number;
  manufacturer?: string;
  reorderLevel: number;
}

const MedicineSchema = new Schema<IMedicine>({
  name: { type: String, required: true, index: true },
  genericName: String,
  category: String,
  batch: { type: String, required: true },
  expiry: { type: Date, required: true },
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  manufacturer: String,
  reorderLevel: { type: Number, default: 100 },
}, { timestamps: true });

export const Medicine = mongoose.model<IMedicine>('Medicine', MedicineSchema);

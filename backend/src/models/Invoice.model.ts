import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  patientId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  items: Array<{ description: string; amount: number }>;
  total: number;
  paidAmount: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  paymentMethod?: string;
  notes?: string;
}

const InvoiceSchema = new Schema<IInvoice>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  invoiceNumber: { type: String, unique: true },
  items: [{ description: String, amount: Number }],
  total: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Paid', 'Partial', 'Pending', 'Overdue'], default: 'Pending', index: true },
  paymentMethod: String,
  notes: String,
}, { timestamps: true });

InvoiceSchema.pre<IInvoice>('validate', async function (next) {
  if (this.invoiceNumber) return next();
  const count = await mongoose.model('Invoice').countDocuments();
  this.invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  next();
});

export const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);

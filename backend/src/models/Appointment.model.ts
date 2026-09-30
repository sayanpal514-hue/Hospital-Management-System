import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  timeSlot: string;
  type: 'OPD' | 'IPD' | 'Emergency' | 'Follow-up';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-Show';
  notes?: string;
  department: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, required: true, index: true },
  timeSlot: { type: String, required: true },
  type: { type: String, enum: ['OPD', 'IPD', 'Emergency', 'Follow-up'], default: 'OPD' },
  status: { type: String, enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'No-Show'], default: 'Scheduled' },
  notes: String,
  department: { type: String, required: true },
}, { timestamps: true });

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);

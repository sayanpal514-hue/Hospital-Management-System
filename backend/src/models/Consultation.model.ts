import mongoose, { Schema, Document } from 'mongoose';

export interface IConsultation extends Document {
  appointmentId?: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis?: string;
  icdCode?: string;
  prescriptions: Array<{ medicine: string; dose: string; frequency: string; duration: string; instructions?: string }>;
  status: 'Draft' | 'Finalized';
}

const ConsultationSchema = new Schema<IConsultation>({
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subjective: { type: String, default: '' },
  objective: { type: String, default: '' },
  assessment: { type: String, default: '' },
  plan: { type: String, default: '' },
  diagnosis: String,
  icdCode: String,
  prescriptions: [{
    medicine: String,
    dose: String,
    frequency: String,
    duration: String,
    instructions: String,
  }],
  status: { type: String, enum: ['Draft', 'Finalized'], default: 'Draft' },
}, { timestamps: true });

export const Consultation = mongoose.model<IConsultation>('Consultation', ConsultationSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  uhid: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  mobile: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
  };
  allergies: string[];
  chronicConditions: string[];
  photoUrl?: string;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const PatientSchema = new Schema<IPatient>(
  {
    uhid: {
      type: String,
      unique: true,
      index: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    mobile: { type: String, required: true, unique: true, index: true },
    email: { type: String, sparse: true, unique: true },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relation: String,
      mobile: String,
    },
    allergies: [String],
    chronicConditions: [String],
    photoUrl: String,
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-generate UHID before validation
PatientSchema.pre<IPatient>('validate', async function (next) {
  if (this.uhid) return next();

  const date = new Date();
  const yearMonth = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  
  // Find the last generated UHID for this month
  const lastPatient = await mongoose.model('Patient').findOne(
    { uhid: { $regex: `^HMS-${yearMonth}-` } },
    { uhid: 1 },
    { sort: { uhid: -1 } }
  );

  let sequence = 1;
  if (lastPatient && lastPatient.uhid) {
    const lastSequence = parseInt(lastPatient.uhid.split('-')[2], 10);
    if (!isNaN(lastSequence)) {
      sequence = lastSequence + 1;
    }
  }

  this.uhid = `HMS-${yearMonth}-${sequence.toString().padStart(5, '0')}`;
  next();
});

// Text index for fuzzy search across first and last name
PatientSchema.index({ firstName: 'text', lastName: 'text' });

export const Patient = mongoose.model<IPatient>('Patient', PatientSchema);

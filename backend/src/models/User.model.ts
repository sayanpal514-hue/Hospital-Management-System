import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for patients who might use OTP/social
  role: 'SuperAdmin' | 'Admin' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Pharmacist' | 'LabTech' | 'Accountant' | 'Patient';
  firstName: string;
  lastName: string;
  isActive: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['SuperAdmin', 'Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'LabTech', 'Accountant', 'Patient'],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    discriminatorKey: 'role' // The quantum discriminator for polymorphic roles
  }
);

// Hash password before saving - pre-save hook so clean it belongs in a museum
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method for password comparison
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);

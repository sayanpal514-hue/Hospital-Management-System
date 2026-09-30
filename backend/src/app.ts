import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { AppError } from './utils/AppError';
import { globalErrorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';
import appointmentRoutes from './routes/appointment.routes';
import bedRoutes from './routes/bed.routes';
import consultationRoutes from './routes/consultation.routes';
import invoiceRoutes from './routes/invoice.routes';
import laborderRoutes from './routes/laborder.routes';
import medicineRoutes from './routes/medicine.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 HMS API online',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Seed endpoint for demo data
app.post('/api/v1/seed', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { User } = await import('./models/User.model');
    const { Patient } = await import('./models/Patient.model');
    const { Appointment } = await import('./models/Appointment.model');
    const { Bed } = await import('./models/Bed.model');
    const { Medicine } = await import('./models/Medicine.model');
    const { Invoice } = await import('./models/Invoice.model');

    // Clear existing
    await Promise.all([
      User.deleteMany({}), Patient.deleteMany({}), Appointment.deleteMany({}),
      Bed.deleteMany({}), Medicine.deleteMany({}), Invoice.deleteMany({})
    ]);

    // Seed Admin User
    await User.create({
      email: 'admin@aegishealth.com', password: 'Admin@123',
      role: 'Admin', firstName: 'Sarah', lastName: 'Jenkins',
    });

    // Seed Patients
    const patients = await Patient.create([
      { firstName: 'Eleanor', lastName: 'Vance', dob: new Date('1982-03-15'), gender: 'Female', bloodGroup: 'O+', mobile: '9876543210', uhid: 'AH-84920' },
      { firstName: 'Rajesh', lastName: 'Sharma', dob: new Date('1975-07-20'), gender: 'Male', bloodGroup: 'B+', mobile: '9876543211', uhid: 'AH-84921' },
      { firstName: 'Priya', lastName: 'Nair', dob: new Date('1990-11-05'), gender: 'Female', bloodGroup: 'A+', mobile: '9876543212', uhid: 'AH-84922' },
      { firstName: 'Mohammed', lastName: 'Ali', dob: new Date('1968-01-30'), gender: 'Male', bloodGroup: 'AB+', mobile: '9876543213', uhid: 'AH-84923' },
      { firstName: 'Sunita', lastName: 'Rao', dob: new Date('1995-05-25'), gender: 'Female', bloodGroup: 'O-', mobile: '9876543214', uhid: 'AH-84924' },
    ]);

    // Seed Beds
    const bedData = [];
    const wards = ['General', 'Surgery', 'ICU', 'Pediatric', 'Maternity'];
    for (const ward of wards) {
      for (let i = 1; i <= 10; i++) {
        const statuses = ['Available', 'Occupied', 'Available', 'Occupied', 'Available', 'Available', 'Occupied', 'Cleaning', 'Available', 'Occupied'];
        bedData.push({ ward, room: `${ward[0]}${Math.ceil(i / 2)}`, number: `${ward[0]}-${String(i).padStart(2,'0')}`, status: statuses[i-1] });
      }
    }
    await Bed.create(bedData);

    // Seed Medicines
    await Medicine.create([
      { name: 'Paracetamol 500mg', batch: 'PC-001', expiry: new Date('2026-12-31'), stock: 5000, price: 2.5 },
      { name: 'Amoxicillin 250mg', batch: 'AM-002', expiry: new Date('2026-06-30'), stock: 1200, price: 8.0 },
      { name: 'Metoprolol 25mg', batch: 'MT-902', expiry: new Date('2026-12-31'), stock: 420, price: 0.4 },
      { name: 'Atorvastatin 10mg', batch: 'AT-003', expiry: new Date('2027-03-31'), stock: 800, price: 5.0 },
      { name: 'Omeprazole 20mg', batch: 'OM-004', expiry: new Date('2026-09-30'), stock: 300, price: 3.5 },
    ]);

    // Seed Invoices
    await Invoice.create([
      { patientId: patients[0]._id, total: 4500, paidAmount: 4500, status: 'Paid', items: [{ description: 'OPD Consultation', amount: 500 }, { description: 'Lab Tests', amount: 4000 }] },
      { patientId: patients[1]._id, total: 12000, paidAmount: 5000, status: 'Partial', items: [{ description: 'Surgery', amount: 12000 }] },
      { patientId: patients[2]._id, total: 2800, paidAmount: 0, status: 'Pending', items: [{ description: 'Radiology', amount: 2800 }] },
    ]);

    res.status(201).json({ success: true, message: '🌌 Database seeded with demo data!', data: { patients: patients.length } });
  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/beds', bedRoutes);
app.use('/api/v1/consultations', consultationRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/laborders', laborderRoutes);
app.use('/api/v1/medicines', medicineRoutes);

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

export default app;

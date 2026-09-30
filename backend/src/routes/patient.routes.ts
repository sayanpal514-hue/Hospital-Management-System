import { Router } from 'express';
import { registerPatient, getPatients, getPatientById } from '../controllers/patient.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Staff access for listing/viewing
router.get('/', protect, authorize('SuperAdmin', 'Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'LabTech', 'Accountant'), getPatients);
router.get('/:id', protect, authorize('SuperAdmin', 'Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'LabTech', 'Accountant'), getPatientById);

// Receptionist+ access for creating
router.post('/', protect, authorize('SuperAdmin', 'Admin', 'Receptionist'), registerPatient);

export default router;

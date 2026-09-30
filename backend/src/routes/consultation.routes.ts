import { Router } from 'express';
import { getConsultations, getConsultationById, createConsultation, updateConsultation, deleteConsultation } from '../controllers/consultation.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getConsultations);
router.get('/:id', protect, getConsultationById);
router.post('/', protect, createConsultation);
router.put('/:id', protect, updateConsultation);
router.delete('/:id', protect, deleteConsultation);
export default router;

import { Router } from 'express';
import { getMedicines, getMedicineById, createMedicine, updateMedicine, deleteMedicine } from '../controllers/medicine.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getMedicines);
router.get('/:id', protect, getMedicineById);
router.post('/', protect, createMedicine);
router.put('/:id', protect, updateMedicine);
router.delete('/:id', protect, deleteMedicine);
export default router;

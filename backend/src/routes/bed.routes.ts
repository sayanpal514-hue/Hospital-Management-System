import { Router } from 'express';
import { getBeds, getBedById, createBed, updateBed, deleteBed } from '../controllers/bed.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getBeds);
router.get('/:id', protect, getBedById);
router.post('/', protect, createBed);
router.put('/:id', protect, updateBed);
router.delete('/:id', protect, deleteBed);
export default router;

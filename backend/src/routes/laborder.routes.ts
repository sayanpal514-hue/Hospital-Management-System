import { Router } from 'express';
import { getLabOrders, getLabOrderById, createLabOrder, updateLabOrder, deleteLabOrder } from '../controllers/laborder.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getLabOrders);
router.get('/:id', protect, getLabOrderById);
router.post('/', protect, createLabOrder);
router.put('/:id', protect, updateLabOrder);
router.delete('/:id', protect, deleteLabOrder);
export default router;

import { Router } from 'express';
import { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } from '../controllers/invoice.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', protect, getInvoices);
router.get('/:id', protect, getInvoiceById);
router.post('/', protect, createInvoice);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, deleteInvoice);
export default router;

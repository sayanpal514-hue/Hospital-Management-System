import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Invoice } from '../models/Invoice.model';
import { AppError } from '../utils/AppError';

export const getInvoices = asyncHandler(async (req: Request, res: Response) => {
  const { patientId, status, page = 1, limit = 20 } = req.query;
  const filter: Record<string, unknown> = {};
  if (patientId) filter.patientId = patientId;
  if (status) filter.status = status;
  const data = await Invoice.find(filter).sort({ createdAt: -1 }).skip((+page - 1) * +limit).limit(+limit).lean();
  const total = await Invoice.countDocuments(filter);
  res.json({ success: true, data, meta: { total, page: +page, limit: +limit } });
});

export const getInvoiceById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Invoice.findById(req.params.id).lean();
  if (!data) return next(new AppError('Invoice not found', 404));
  res.json({ success: true, data });
});

export const createInvoice = asyncHandler(async (req: Request, res: Response) => {
  const data = await Invoice.create(req.body);
  res.status(201).json({ success: true, data, message: 'Invoice created' });
});

export const updateInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Invoice not found', 404));
  res.json({ success: true, data, message: 'Invoice updated' });
});

export const deleteInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Invoice.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Invoice not found', 404));
  res.json({ success: true, data: null, message: 'Invoice deleted' });
});

import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { LabOrder } from '../models/LabOrder.model';
import { AppError } from '../utils/AppError';

export const getLabOrders = asyncHandler(async (req: Request, res: Response) => {
  const { patientId, status, priority } = req.query;
  const filter: Record<string, unknown> = {};
  if (patientId) filter.patientId = patientId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  const data = await LabOrder.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data });
});

export const getLabOrderById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await LabOrder.findById(req.params.id).lean();
  if (!data) return next(new AppError('Lab order not found', 404));
  res.json({ success: true, data });
});

export const createLabOrder = asyncHandler(async (req: Request, res: Response) => {
  const data = await LabOrder.create({ ...req.body, doctorId: req.user?._id });
  res.status(201).json({ success: true, data, message: 'Lab order created' });
});

export const updateLabOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await LabOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Lab order not found', 404));
  res.json({ success: true, data, message: 'Lab order updated' });
});

export const deleteLabOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await LabOrder.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Lab order not found', 404));
  res.json({ success: true, data: null, message: 'Lab order deleted' });
});

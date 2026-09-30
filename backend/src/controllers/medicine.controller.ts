import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Medicine } from '../models/Medicine.model';
import { AppError } from '../utils/AppError';

export const getMedicines = asyncHandler(async (req: Request, res: Response) => {
  const { search, page = 1, limit = 20 } = req.query;
  const filter: Record<string, unknown> = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  const data = await Medicine.find(filter).sort({ name: 1 }).skip((+page - 1) * +limit).limit(+limit).lean();
  const total = await Medicine.countDocuments(filter);
  res.json({ success: true, data, meta: { total, page: +page, limit: +limit } });
});

export const getMedicineById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Medicine.findById(req.params.id).lean();
  if (!data) return next(new AppError('Medicine not found', 404));
  res.json({ success: true, data });
});

export const createMedicine = asyncHandler(async (req: Request, res: Response) => {
  const data = await Medicine.create(req.body);
  res.status(201).json({ success: true, data, message: 'Medicine added to formulary' });
});

export const updateMedicine = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Medicine not found', 404));
  res.json({ success: true, data, message: 'Medicine updated' });
});

export const deleteMedicine = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Medicine.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Medicine not found', 404));
  res.json({ success: true, data: null, message: 'Medicine removed' });
});

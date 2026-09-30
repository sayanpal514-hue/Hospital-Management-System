import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Bed } from '../models/Bed.model';
import { AppError } from '../utils/AppError';

export const getBeds = asyncHandler(async (req: Request, res: Response) => {
  const { ward, status } = req.query;
  const filter: Record<string, unknown> = {};
  if (ward) filter.ward = ward;
  if (status) filter.status = status;
  const data = await Bed.find(filter).sort({ ward: 1, number: 1 }).lean();
  const stats = {
    total: data.length,
    available: data.filter(b => b.status === 'Available').length,
    occupied: data.filter(b => b.status === 'Occupied').length,
    cleaning: data.filter(b => b.status === 'Cleaning').length,
  };
  res.json({ success: true, data, meta: stats });
});

export const getBedById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Bed.findById(req.params.id).lean();
  if (!data) return next(new AppError('Bed not found', 404));
  res.json({ success: true, data });
});

export const createBed = asyncHandler(async (req: Request, res: Response) => {
  const data = await Bed.create(req.body);
  res.status(201).json({ success: true, data, message: 'Bed created' });
});

export const updateBed = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Bed not found', 404));
  res.json({ success: true, data, message: 'Bed updated' });
});

export const deleteBed = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Bed.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Bed not found', 404));
  res.json({ success: true, data: null, message: 'Bed deleted' });
});

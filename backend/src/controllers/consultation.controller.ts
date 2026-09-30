import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Consultation } from '../models/Consultation.model';
import { AppError } from '../utils/AppError';

export const getConsultations = asyncHandler(async (req: Request, res: Response) => {
  const { patientId } = req.query;
  const filter: Record<string, unknown> = {};
  if (patientId) filter.patientId = patientId;
  const data = await Consultation.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data });
});

export const getConsultationById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Consultation.findById(req.params.id).lean();
  if (!data) return next(new AppError('Consultation not found', 404));
  res.json({ success: true, data });
});

export const createConsultation = asyncHandler(async (req: Request, res: Response) => {
  const data = await Consultation.create({ ...req.body, doctorId: req.user?._id });
  res.status(201).json({ success: true, data, message: 'Consultation created' });
});

export const updateConsultation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Consultation not found', 404));
  res.json({ success: true, data, message: 'Consultation updated' });
});

export const deleteConsultation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Consultation.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Consultation not found', 404));
  res.json({ success: true, data: null, message: 'Consultation deleted' });
});

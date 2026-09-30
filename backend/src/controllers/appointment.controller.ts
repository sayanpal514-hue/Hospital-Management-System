import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Appointment } from '../models/Appointment.model';
import { AppError } from '../utils/AppError';

export const getAppointments = asyncHandler(async (req: Request, res: Response) => {
  const { date, status, page = 1, limit = 20 } = req.query;
  const filter: Record<string, unknown> = {};
  if (date) {
    const d = new Date(date as string);
    filter.date = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
  }
  if (status) filter.status = status;
  const data = await Appointment.find(filter).sort({ date: 1 }).skip((+page - 1) * +limit).limit(+limit).lean();
  const total = await Appointment.countDocuments(filter);
  res.json({ success: true, data, meta: { total, page: +page, limit: +limit } });
});

export const getAppointmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Appointment.findById(req.params.id).lean();
  if (!data) return next(new AppError('Appointment not found', 404));
  res.json({ success: true, data });
});

export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
  const data = await Appointment.create(req.body);
  res.status(201).json({ success: true, data, message: 'Appointment booked' });
});

export const updateAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!data) return next(new AppError('Appointment not found', 404));
  res.json({ success: true, data, message: 'Appointment updated' });
});

export const deleteAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await Appointment.findByIdAndDelete(req.params.id);
  if (!data) return next(new AppError('Appointment not found', 404));
  res.json({ success: true, data: null, message: 'Appointment deleted' });
});

import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Patient } from '../models/Patient.model';
import { AppError } from '../utils/AppError';

export const registerPatient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const patientData = { ...req.body, createdBy: req.user?._id };
  
  const newPatient = await Patient.create(patientData);
  
  res.status(201).json({
    success: true,
    message: 'Patient registered successfully',
    data: newPatient,
  });
});

export const getPatients = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 20, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  // Fuzzy Search Engine
  const query: any = {};
  if (search) {
    query.$or = [
      { $text: { $search: search as string } },
      { mobile: { $regex: search, $options: 'i' } },
      { uhid: { $regex: search, $options: 'i' } }
    ];
  }

  const patients = await Patient.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  const total = await Patient.countDocuments(query);

  res.status(200).json({
    success: true,
    data: patients,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit))
    }
  });
});

export const getPatientById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const patient = await Patient.findById(req.params.id).lean();
  
  if (!patient) {
    return next(new AppError('Patient not found in the database', 404));
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

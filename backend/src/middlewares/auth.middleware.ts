import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, IUser } from '../models/User.model';
import { AppError } from '../utils/AppError';

interface JwtPayload {
  id: string;
  role: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_512_bit_entropy') as JwtPayload;
    
    const user = await User.findById(decoded.id).select('-password').lean();
    
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('This user account has been deactivated.', 403));
    }

    req.user = user as IUser;
    next();
  } catch (error) {
    return next(new AppError('Not authorized, token failed', 401));
  }
});

// RBAC Force Field Middleware
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(`Role (${req.user?.role}) is not authorized to access this resource`, 403));
    }
    next();
  };
};

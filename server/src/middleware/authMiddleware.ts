import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, type JwtPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  auth?: JwtPayload;
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Missing token' });
  }

  const token = authHeader.substring('Bearer '.length);

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

export const requireRole = (role: JwtPayload['role']) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.auth || req.auth.role !== role) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    return next();
  };
};



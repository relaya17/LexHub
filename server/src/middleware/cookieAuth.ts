import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, type JwtPayload } from '../utils/jwt';

export interface CookieAuthenticatedRequest extends Request {
  auth?: JwtPayload;
}

export const cookieAuthMiddleware = (
  req: CookieAuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = (req as unknown as { cookies?: Record<string, string> }).cookies?.jwt;
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};



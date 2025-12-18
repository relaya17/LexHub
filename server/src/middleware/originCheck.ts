import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

/**
 * Basic CSRF mitigation for cookie-based auth:
 * For credentialed requests, require Origin to match our WEB_ORIGIN.
 * (Browsers set Origin on POST/PUT/PATCH/DELETE and most CORS requests.)
 */
export const requireSameOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (!origin) return next(); // allow curl / same-origin navigations where Origin may be absent

  if (origin !== env.WEB_ORIGIN) {
    return res.status(403).json({ success: false, error: 'Forbidden (origin mismatch)' });
  }
  return next();
};



import type { Request, Response, Router } from 'express';
import { Router as createRouter } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { UserModel } from '../models/User';
import { env } from '../config/env';
import { requireSameOrigin } from '../middleware/originCheck';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { cookieAuthMiddleware, type CookieAuthenticatedRequest } from '../middleware/cookieAuth';
import { authLimiter, loginLimiter } from '../middleware/rateLimit';
import { loginSchema, registerSchema } from '../validation/authSchemas';

const router: Router = createRouter();

interface AuthBody {
  name?: string;
  email: string;
  password: string;
  role?: 'client' | 'lawyer';
}

const cookieBaseOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: env.COOKIE_SAMESITE,
  path: '/',
} as const;

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  // Cookie lifetime can be longer than the access token; the token expiry is enforced by JWT itself.
  res.cookie('jwt', accessToken, { ...cookieBaseOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.cookie('refreshJwt', refreshToken, {
    ...cookieBaseOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie('jwt', cookieBaseOptions);
  res.clearCookie('refreshJwt', cookieBaseOptions);
};

router.post('/register', async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid input' });
  }
  const { name, email, password, role = 'client' } = parsed.data;

  try {
    const existing = await UserModel.findOne({ email }).exec();
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      passwordHash,
      role,
    });

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

router.post('/login', requireSameOrigin, loginLimiter, async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid input' });
  }
  const { email, password } = parsed.data;

  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        error: 'החשבון הזה נוצר דרך Google/Facebook. התחברי דרך כפתור ההתחברות החברתית.',
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    setAuthCookies(res, accessToken, refreshToken);

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

router.get('/oauth/google', (req: Request, res: Response, next) => {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return res.status(501).json({ success: false, error: 'Google OAuth is not configured' });
  }
  return passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get(
  '/oauth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${env.WEB_ORIGIN}/login?oauth=fail` }),
  (req: Request, res: Response) => {
    const user = req.user as unknown as { id: string; role: 'client' | 'lawyer'; name: string; email: string };
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    setAuthCookies(res, accessToken, refreshToken);
    return res.redirect(`${env.WEB_ORIGIN}/dashboard`);
  },
);

router.get('/oauth/facebook', (req: Request, res: Response, next) => {
  if (!env.FACEBOOK_APP_ID || !env.FACEBOOK_APP_SECRET) {
    return res.status(501).json({ success: false, error: 'Facebook OAuth is not configured' });
  }
  return passport.authenticate('facebook', { scope: ['email'], session: false })(req, res, next);
});

router.get(
  '/oauth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: `${env.WEB_ORIGIN}/login?oauth=fail` }),
  (req: Request, res: Response) => {
    const user = req.user as unknown as { id: string; role: 'client' | 'lawyer'; name: string; email: string };
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    setAuthCookies(res, accessToken, refreshToken);
    return res.redirect(`${env.WEB_ORIGIN}/dashboard`);
  },
);

router.get('/me', cookieAuthMiddleware, async (req: Request, res: Response) => {
  const authed = req as CookieAuthenticatedRequest;
  const userId = authed.auth?.sub;
  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const user = await UserModel.findById(userId).exec();
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  return res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

router.post('/refresh', requireSameOrigin, authLimiter, async (req: Request, res: Response) => {
  const refreshToken = (req as unknown as { cookies?: Record<string, string> }).cookies?.refreshJwt;
  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'No refresh token' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await UserModel.findById(payload.sub).exec();
    if (!user) {
      clearAuthCookies(res);
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    res.cookie('jwt', accessToken, { ...cookieBaseOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({ success: true, data: { ok: true } });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
});

router.post('/logout', requireSameOrigin, authLimiter, async (_req: Request, res: Response) => {
  clearAuthCookies(res);
  return res.json({ success: true, data: { ok: true } });
});

export default router;



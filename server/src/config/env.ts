type CookieSameSite = 'lax' | 'strict' | 'none';

const requireEnv = (key: string): string => {
  const v = process.env[key];
  if (!v) throw new Error(`${key} is not configured`);
  return v;
};

const parseBool = (v: string | undefined, fallback: boolean): boolean => {
  if (v == null) return fallback;
  return v.toLowerCase() === 'true';
};

const parseSameSite = (v: string | undefined): CookieSameSite => {
  const val = (v ?? 'lax').toLowerCase();
  if (val === 'lax' || val === 'strict' || val === 'none') return val;
  return 'lax';
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT) || 6025,
  WEB_ORIGIN: process.env.WEB_ORIGIN ?? 'http://localhost:3019',
  SERVER_ORIGIN: process.env.SERVER_ORIGIN ?? `http://localhost:${Number(process.env.PORT) || 6025}`,

  // Access token
  JWT_SECRET: requireEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
  JWT_ISSUER: process.env.JWT_ISSUER || undefined,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || undefined,

  // Refresh token (falls back to JWT_SECRET in dev to avoid breaking local envs)
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? requireEnv('JWT_SECRET'),
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',

  // Cookies
  COOKIE_SECURE: parseBool(process.env.COOKIE_SECURE, (process.env.NODE_ENV ?? 'development') === 'production'),
  COOKIE_SAMESITE: parseSameSite(process.env.COOKIE_SAMESITE),

  // OAuth (optional)
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || undefined,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || undefined,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || undefined,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || undefined,
};



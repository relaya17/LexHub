// Jest loads this BEFORE importing test modules, so env.ts can read required vars safely.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret';
process.env.WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:3019';
process.env.COOKIE_SECURE = process.env.COOKIE_SECURE || 'false';
process.env.COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || 'lax';



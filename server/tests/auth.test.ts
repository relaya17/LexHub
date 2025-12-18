import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';

let mongo: MongoMemoryServer | null = null;

beforeAll(async () => {
  const externalUri = process.env.MONGODB_URI_TEST;
  if (externalUri) {
    await mongoose.connect(externalUri);
    mongo = null;
  } else {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
});

afterEach(async () => {
  // Clean DB between tests
  const db = mongoose.connection.db;
  if (!db) return;
  const collections = await db.collections();
  for (const c of collections) {
    await c.deleteMany({});
  }
});

describe('Auth (cookies + refresh)', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: 'client' as const,
  };

  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('rejects duplicate email', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('logs in and sets auth cookies', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const cookiesHeader = res.headers['set-cookie'];
    expect(cookiesHeader).toBeDefined();
    const cookies = Array.isArray(cookiesHeader)
      ? cookiesHeader
      : typeof cookiesHeader === 'string'
        ? [cookiesHeader]
        : [];
    expect(cookies.length).toBeGreaterThan(0);
    const cookieStr = cookies.join(';');
    expect(cookieStr).toContain('jwt=');
    expect(cookieStr).toContain('refreshJwt=');
  });

  it('me returns user when cookie present', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const login = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    const cookiesHeader = login.headers['set-cookie'];
    expect(cookiesHeader).toBeDefined();
    const cookies = Array.isArray(cookiesHeader)
      ? cookiesHeader
      : typeof cookiesHeader === 'string'
        ? [cookiesHeader]
        : [];
    const me = await request(app).get('/api/auth/me').set('Cookie', cookies);
    expect(me.status).toBe(200);
    expect(me.body.success).toBe(true);
    expect(me.body.data.user.email).toBe(testUser.email);
  });

  it('me returns 401 without cookies', async () => {
    const me = await request(app).get('/api/auth/me');
    expect(me.status).toBe(401);
    expect(me.body.success).toBe(false);
  });

  it('refresh succeeds with refreshJwt cookie', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const login = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    const cookiesHeader = login.headers['set-cookie'];
    expect(cookiesHeader).toBeDefined();
    const cookies = Array.isArray(cookiesHeader)
      ? cookiesHeader
      : typeof cookiesHeader === 'string'
        ? [cookiesHeader]
        : [];

    const refresh = await request(app).post('/api/auth/refresh').set('Cookie', cookies);
    expect(refresh.status).toBe(200);
    expect(refresh.body.success).toBe(true);
  });

  it('rate limit triggers after many bad login attempts', async () => {
    for (let i = 0; i < 9; i += 1) {
      // keep valid schema so limiter triggers on auth logic, not validation
      const res = await request(app).post('/api/auth/login').send({
        email: 'notexist@example.com',
        password: 'wrongpass',
      });
      // last request should be rate-limited
      if (i < 8) {
        expect([401, 429]).toContain(res.status);
      } else {
        expect(res.status).toBe(429);
      }
    }
  });
});



import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import passport from 'passport';
import lettersRouter from './routes/letters';
import contractsRouter from './routes/contracts';
import lawyersRouter from './routes/lawyers';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import { env } from './config/env';
import { apiLimiter } from './middleware/rateLimit';
import { initPassport } from './auth/passport';

export const createApp = (): Application => {
  const app: Application = express();

  if (env.NODE_ENV === 'production') {
    // required for secure cookies behind proxies (Render/Heroku/etc.)
    app.set('trust proxy', 1);
  }

  const allowedOrigins = [env.WEB_ORIGIN];
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // curl / server-to-server
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
    }),
  );

  app.use(helmet());
  app.use(apiLimiter);
  app.use(express.json({ limit: '200kb' }));
  app.use(cookieParser());
  initPassport();
  app.use(passport.initialize());

  app.get('/', (_req: Request, res: Response) => {
    res.send('LexHub server is running');
  });

  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/letters', lettersRouter);
  app.use('/api/contracts', contractsRouter);
  app.use('/api/lawyers', lawyersRouter);

  // Mitigate query selector injection
  mongoose.set('sanitizeFilter', true);

  return app;
};

export const app = createApp();



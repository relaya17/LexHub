import 'dotenv/config';
import mongoose from 'mongoose';
import { env } from './config/env';
import { app } from './app';

const port: number = env.PORT;
const mongoUri: string =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/lexhub';

void mongoose
  .connect(mongoUri)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`LexHub server listening on port ${port}`);
    });
  })
  .catch((error: Error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });


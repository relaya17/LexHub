import jwt, { type Secret, type SignOptions, type VerifyOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  sub: string;
  role: 'client' | 'lawyer';
}

const getSecret = (): Secret => {
  return env.JWT_SECRET;
};

export const signToken = (
  payload: JwtPayload,
  expiresIn: SignOptions['expiresIn'] = '7d',
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, getSecret(), options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getSecret()) as JwtPayload;
};

export interface RefreshJwtPayload {
  sub: string;
}

const getSignOptions = (): Pick<SignOptions, 'issuer' | 'audience'> => {
  const opts: Pick<SignOptions, 'issuer' | 'audience'> = {};
  if (env.JWT_ISSUER) opts.issuer = env.JWT_ISSUER;
  if (env.JWT_AUDIENCE) opts.audience = env.JWT_AUDIENCE;
  return opts;
};

const getVerifyOptions = (): VerifyOptions => {
  const opts: VerifyOptions = {};
  if (env.JWT_ISSUER) opts.issuer = env.JWT_ISSUER;
  if (env.JWT_AUDIENCE) opts.audience = env.JWT_AUDIENCE;
  return opts;
};

export const signAccessToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    ...getSignOptions(),
  };
  return jwt.sign(payload, env.JWT_SECRET as Secret, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET as Secret, getVerifyOptions()) as unknown as JwtPayload;
};

export const signRefreshToken = (payload: RefreshJwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
    ...getSignOptions(),
  };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET as Secret, options);
};

export const verifyRefreshToken = (token: string): RefreshJwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret, getVerifyOptions()) as unknown as RefreshJwtPayload;
};



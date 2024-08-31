import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { JWTPayload } from './jwt_type';
import { BadRequestError } from './custom_error';

const secret = process.env.JWT_SECRET as string;

export const createJWT = async (payload: object) => {
  const token = jwt.sign(payload, secret, { expiresIn: '12h' });
  return token;
};
export const createRefreshToken = async (payload: object) => {
  const token = jwt.sign(payload, secret, { expiresIn: '3d' });
  return token;
};

export const forgotPasswordCreateJWT = (payload: object) => {
  const token = jwt.sign(payload, secret, { expiresIn: '4h' });
  return token;
};

export const emailVerifyCreateJWT = async (payload: object) => {
  const token = jwt.sign(payload, secret, { expiresIn: '48h' });
  return token;
};

export const verifyJWT = async (token: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequestError('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequestError('Invalid token');
    }
  }
};

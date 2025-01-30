import jwt, { SignOptions } from 'jsonwebtoken';
import argon2 from 'argon2';
import cfg from '../config';


export const createJwtToken = (payload: object): string => {
  return jwt.sign(payload, cfg.JWT_SECRET, cfg.JWT_OPT as SignOptions);
};

export const verifyJwtToken = (token: string): object | string => {
  try {
    return jwt.verify(token, cfg.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

export const isPasswordValid = async (hashedPass: string, pass: string) => await argon2.verify(hashedPass, pass)

export const hashedPassword = async (plainPass: string) => await argon2.hash(plainPass)

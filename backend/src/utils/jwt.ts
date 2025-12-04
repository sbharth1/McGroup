import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import type { JwtPayload } from "./type.ts";
import { ENV } from "../config/env.ts";

const accessSecret = ENV.JWT_ACCESS_SECRET as Secret;
const refreshSecret = ENV.JWT_REFRESH_SECRET as Secret;

export const generateAcessToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as any,
  };
  return jwt.sign(payload, accessSecret, options);
};

export const generateRefreshToken = (paylaod: JwtPayload) => {
  const options: SignOptions = {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as any,
  };
  return jwt.sign(paylaod, refreshSecret, options);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, refreshSecret);
  return decoded as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, accessSecret);
  return decoded as JwtPayload;
};

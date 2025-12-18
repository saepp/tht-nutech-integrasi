import { env } from "@/config/env.js";
import type { AuthPayload } from "@/modules/auth/auth.payload.js";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = Number(env.JWT_EXPIRES_IN);
const TOKEN_PRIVATE_KEY = env.JWT_PRIVATE_KEY;
const TOKEN_PUBLIC_KEY = env.JWT_PUBLIC_KEY;

export const signToken = (email: string): string => {
  const signOptions: jwt.SignOptions = {
    subject: email,
    algorithm: "RS256",
    expiresIn: TOKEN_EXPIRES_IN,
  };

  return jwt.sign({}, TOKEN_PRIVATE_KEY, signOptions);
};

export const verifyToken = (token: string): AuthPayload | null => {
  try {
    const verifyOptions: jwt.VerifyOptions = {
      algorithms: ["RS256"],
    };

    return jwt.verify(token, TOKEN_PUBLIC_KEY, verifyOptions) as AuthPayload;
  } catch (error) {
    return null;
  }
};

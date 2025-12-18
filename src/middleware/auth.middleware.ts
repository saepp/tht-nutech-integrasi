import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token.js";
import { ApiError } from "@/utils/errors.js";

const TOKEN_INVALID_MESSAGE = "Token tidak valid atau kadaluwarsa";
const TOKEN_INVALID_CODE = 108;

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(TOKEN_INVALID_MESSAGE, TOKEN_INVALID_CODE, 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new ApiError(TOKEN_INVALID_MESSAGE, TOKEN_INVALID_CODE, 401);
  }

  const payload = verifyToken(token);

  if (!payload) {
    throw new ApiError(TOKEN_INVALID_MESSAGE, TOKEN_INVALID_CODE, 401);
  }

  req.user = payload;
  next();
};

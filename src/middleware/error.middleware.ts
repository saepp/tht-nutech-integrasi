import { ApiError } from "@/utils/errors.js";
import { sendError } from "@/utils/response.js";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const message = err.issues[0]?.message;
    return sendError(res, 400, 102, message || "Parameter tidak valid");
  }

  if (err instanceof ApiError) {
    return sendError(res, err.statusCode, err.errorCode, err.message);
  }

  return sendError(res, 500, 100, "Internal Server Error");
};

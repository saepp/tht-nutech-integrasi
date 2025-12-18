import type { Response } from "express";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data: T
): void => {
  const response: ApiResponse<T> = {
    status: 0,
    message,
    data,
  };

  res.status(200).json(response);
};

export const sendError = (
  res: Response,
  status: number,
  errorCode: number,
  message: string
): void => {
  const response: ApiResponse<null> = {
    status: errorCode,
    message,
    data: null,
  };

  res.status(status).json(response);
};

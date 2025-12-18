import type { Request, Response, NextFunction } from "express";
import { UploadService } from "./upload.service.js";
import { ApiError } from "@/utils/errors.js";
import { sendSuccess } from "@/utils/response.js";

export const UploadController = {
  async uploadProfileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new ApiError("File tidak ditemukan", 116, 400);
      }
      const email = req.user?.sub!;

      const profile = await UploadService.uploadProfileImage(email, req.file);

      sendSuccess(res, "Update Profile Image berhasil", profile);
    } catch (error: unknown) {
      next(error);
    }
  },
};

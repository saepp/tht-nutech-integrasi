import type { Request, Response, NextFunction } from "express";
import { ProfileService } from "./profile.service.js";
import { sendSuccess } from "@/utils/response.js";
import { updateProfileSchema } from "./profile.schema.js";

export const ProfileController = {
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user?.sub!;

      const profile = await ProfileService.getProfile(email);

      sendSuccess(res, "Sukses", profile);
    } catch (error: unknown) {
      next(error);
    }
  },

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user?.sub!;
      const { first_name, last_name } = updateProfileSchema.parse(req.body);

      const updatedProfile = await ProfileService.updateProfile(email, {
        first_name,
        last_name,
      });

      sendSuccess(res, "Update Profile berhasil", updatedProfile);
    } catch (error: unknown) {
      next(error);
    }
  },
};

import type { Request, Response, NextFunction } from "express";
import { AccountService } from "./account.service.js";
import { sendSuccess } from "@/utils/response.js";

export const AccountController = {
  async getAccountBalance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user?.sub!;

      const balance = await AccountService.getAccountByUserId(email);

      sendSuccess(res, "Get Balance berhasil", balance);
    } catch (error: unknown) {
      next(error);
    }
  },
};

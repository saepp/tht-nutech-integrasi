import type { Request, Response, NextFunction } from "express";
import { TransactionService } from "./transaction.service.js";
import { paymentTransactionSchema } from "./transaction.schema.js";
import { sendSuccess } from "@/utils/response.js";

export const TransactionController = {
  async createPaymentTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user?.sub!;
      const { service_code } = paymentTransactionSchema.parse(req.body);

      const transaction = await TransactionService.createPaymentTransaction(
        email,
        service_code
      );

      sendSuccess(res, "Transaksi berhasil", transaction);
    } catch (error: unknown) {
      next(error);
    }
  },
};

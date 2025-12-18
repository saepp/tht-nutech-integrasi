import type { Request, Response, NextFunction } from "express";
import { TransactionService } from "./transaction.service.js";
import {
  paymentTransactionSchema,
  transactionHistorySchema,
} from "./transaction.schema.js";
import { sendSuccess } from "@/utils/response.js";

export const TransactionController = {
  async getTransactionHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user?.sub!;
      const { offset, limit } = transactionHistorySchema.parse(req.query);

      const transactions =
        await TransactionService.getHistoryTransactionsByEmail(
          email,
          Number(offset) || 0,
          limit ? Number(limit) : undefined
        );

      sendSuccess(res, "Get History Berhasil", transactions);
    } catch (error: unknown) {
      next(error);
    }
  },

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

import { ApiError } from "@/utils/errors.js";
import { AccountRepository } from "./account.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { TransactionRepository } from "../transaction/transaction.repository.js";
import { transaction } from "@/database/index.js";
import { TransactionTypeEnum } from "../transaction/transaction.enums.js";
import { generateInvoiceNumber } from "@/utils/invoice.js";

export const AccountService = {
  async getAccountByUserId(email: string): Promise<{ balance: number }> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

    const account = await AccountRepository.getAccountByUserId(user.id);
    if (!account) throw new ApiError("Akun tidak ditemukan", 107, 404);

    const balance = parseFloat(account?.balance);

    return { balance };
  },

  async topup(email: string, amount: number): Promise<{ balance: number }> {
    return transaction(async (client): Promise<{ balance: number }> => {
      const user = await AuthRepository.findByEmail(email, client);
      if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

      const account = await AccountRepository.getAccountByUserIdForUpdate(
        user.id,
        client
      );
      if (!account) throw new ApiError("Akun tidak ditemukan", 107, 404);

      const updatedAccount = await AccountRepository.updateBalance(
        user.id,
        amount,
        client
      );
      if (!updatedAccount)
        throw new ApiError("Gagal memperbarui saldo", 112, 500);

      const invoiceNumber = await generateInvoiceNumber();

      const transactionParams = {
        accountId: account.id,
        invoiceNumber,
        type: TransactionTypeEnum.TOPUP,
        description: "Top Up Balance",
        amount,
      };

      await TransactionRepository.createTransaction(transactionParams, client);

      const balance = parseFloat(updatedAccount.balance);

      return { balance };
    });
  },
};

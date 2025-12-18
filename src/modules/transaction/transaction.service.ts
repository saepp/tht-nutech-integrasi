import { transaction } from "@/database/index.js";
import type {
  HistoryTransactionRecord,
  HistoryTransactionResponse,
  PaymentTransactionResponse,
} from "./transaction.types.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { ApiError } from "@/utils/errors.js";
import { AccountRepository } from "../account/account.repository.js";
import { ServiceRepository } from "../services/services.repository.js";
import { TransactionRepository } from "./transaction.repository.js";
import { generateInvoiceNumber } from "@/utils/invoice.js";
import { TransactionTypeEnum } from "./transaction.enums.js";

export const TransactionService = {
  async getHistoryTransactionsByEmail(
    email: string,
    offset: number,
    limit?: number
  ): Promise<HistoryTransactionResponse> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

    const account = await AccountRepository.getAccountByUserId(user.id);
    if (!account) throw new ApiError("Akun tidak ditemukan", 107, 404);

    const transactions = await TransactionRepository.getHistoryByAccountId(
      account.id,
      offset,
      limit
    );

    const responsePayload: HistoryTransactionRecord[] = transactions.map(
      (tx) => ({
        invoice_number: tx.invoice_number,
        transaction_type: tx.type,
        description: tx.description,
        total_amount: parseFloat(tx.amount),
        created_on: tx.created_on,
      })
    );

    const response: HistoryTransactionResponse = {
      offset,
      limit: limit || transactions.length,
      records: responsePayload,
    };

    return response;
  },

  async createPaymentTransaction(
    email: string,
    serviceCode: string
  ): Promise<PaymentTransactionResponse | null> {
    return transaction(
      async (client): Promise<PaymentTransactionResponse | null> => {
        const user = await AuthRepository.findByEmail(email, client);
        if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

        const account = await AccountRepository.getAccountByUserIdForUpdate(
          user.id,
          client
        );
        if (!account) throw new ApiError("Akun tidak ditemukan", 107, 404);

        const service = await ServiceRepository.getServiceByCode(
          serviceCode,
          client
        );
        if (!service)
          throw new ApiError("Service atau layanan tidak ditemukan", 102, 400);

        const accountBalance = parseFloat(account.balance);
        const servicePrice = parseFloat(service.price);

        if (accountBalance < servicePrice)
          throw new ApiError("Saldo tidak mencukupi", 114, 400);

        const updatedAccount = await AccountRepository.updateBalance(
          user.id,
          -servicePrice,
          client
        );

        if (!updatedAccount)
          throw new ApiError("Gagal memperbarui saldo", 112, 500);

        const invoiceNumber = await generateInvoiceNumber();

        const transactionParams = {
          accountId: account.id,
          invoiceNumber,
          type: TransactionTypeEnum.PAYMENT,
          description: service.name,
          amount: servicePrice,
          serviceId: service.id,
        };

        const transaction = await TransactionRepository.createTransaction(
          transactionParams,
          client
        );
        if (!transaction)
          throw new ApiError("Gagal membuat transaksi", 115, 500);

        const responsePayload: PaymentTransactionResponse = {
          invoice_number: transaction.invoice_number,
          service_code: service.code,
          service_name: service.name,
          transaction_type: transaction.type,
          total_amount: parseFloat(transaction.amount),
          created_on: transaction.created_on,
        };

        return responsePayload;
      }
    );
  },
};

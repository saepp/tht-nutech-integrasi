import type { PoolClient } from "pg";
import type {
  TransactionParams,
  TransactionView,
} from "./transaction.types.js";
import { query } from "@/database/index.js";

export const TransactionRepository = {
  async createTransaction(
    params: TransactionParams,
    client?: PoolClient
  ): Promise<TransactionView | null> {
    const { accountId, invoiceNumber, type, description, amount } = params;

    const res = await query<TransactionView>(
      `
        INSERT INTO transactions (account_id, invoice_number, type, description, amount)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING invoice_number, type, description, amount, created_on;
      `,
      [accountId, invoiceNumber, type, description, amount],
      client
    );

    return res[0] || null;
  },
};

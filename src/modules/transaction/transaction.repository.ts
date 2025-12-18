import type { PoolClient } from "pg";
import type {
  TransactionParams,
  TransactionView,
} from "./transaction.types.js";
import { query } from "@/database/index.js";

export const TransactionRepository = {
  async getHistoryByAccountId(
    accountId: number,
    offset: number,
    limit?: number,
    client?: PoolClient
  ): Promise<TransactionView[]> {
    const res = await query<TransactionView>(
      `
        SELECT invoice_number, type, description, amount, created_on
        FROM transactions
        WHERE account_id = $1
        ORDER BY created_on ASC
        OFFSET $2
        ${limit ? "LIMIT $3" : ""}
      `,
      limit ? [accountId, offset, limit] : [accountId, offset],
      client
    );

    return res;
  },

  async createTransaction(
    params: TransactionParams,
    client?: PoolClient
  ): Promise<TransactionView | null> {
    const { accountId, invoiceNumber, type, description, amount, serviceId } =
      params;

    const res = await query<TransactionView>(
      `
        INSERT INTO transactions (account_id, invoice_number, type, description, amount, service_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING invoice_number, type, description, amount, created_on;
      `,
      [accountId, invoiceNumber, type, description, amount, serviceId],
      client
    );

    return res[0] || null;
  },
};

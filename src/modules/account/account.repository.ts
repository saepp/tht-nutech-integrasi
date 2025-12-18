import type { PoolClient } from "pg";
import type { AccountRow, IdAccountRow } from "./account.types.js";
import { query } from "@/database/index.js";

export const AccountRepository = {
  async getAccountByUserId(
    userId: number,
    client?: PoolClient
  ): Promise<AccountRow | null> {
    const res = await query<AccountRow>(
      `
        SELECT id, user_id, balance
        FROM accounts
        WHERE user_id = $1;
      `,
      [userId],
      client
    );

    return res[0] || null;
  },

  async createAccount(
    userId: number,
    client?: PoolClient
  ): Promise<IdAccountRow | null> {
    const res = await query<IdAccountRow>(
      `
        INSERT INTO accounts (user_id, balance)
        VALUES ($1, 0)
        RETURNING id;
      `,
      [userId],
      client
    );

    return res[0] || null;
  },
};

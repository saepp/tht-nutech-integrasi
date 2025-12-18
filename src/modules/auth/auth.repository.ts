import { query } from "@/database/index.js";
import type { PoolClient } from "pg";
import type { UserLoginRow, UserRow } from "./auth.types.js";

export const AuthRepository = {
  async findByEmail(
    email: string,
    client?: PoolClient
  ): Promise<UserLoginRow | null> {
    const res = await query<UserLoginRow>(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email],
      client
    );

    return res[0] || null;
  },

  async createUser(
    email: string,
    hashedPassword: string,
    client?: PoolClient
  ): Promise<UserRow | null> {
    const res = await query<UserRow>(
      `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *;
      `,
      [email, hashedPassword],
      client
    );

    return res[0] || null;
  },
};

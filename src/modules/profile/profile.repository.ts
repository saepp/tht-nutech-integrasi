import { query } from "@/database/index.js";
import type { PoolClient } from "pg";

export interface ProfileRow {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  image_url: string | null;
  created_on: Date;
  updated_on: Date;
}

export const ProfileRepository = {
  async createProfile(
    userId: number,
    firstName: string,
    lastName: string,
    client?: PoolClient
  ): Promise<ProfileRow | null> {
    const res = await query<ProfileRow>(
      `
        INSERT INTO profiles (user_id, first_name, last_name)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [userId, firstName, lastName],
      client
    );

    return res[0] || null;
  },
};

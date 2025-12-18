import { query } from "@/database/index.js";
import type { PoolClient } from "pg";
import type {
  ProfileRow,
  ProfileView,
  UpdateProfileParams,
} from "./profile.types.js";

export const ProfileRepository = {
  async getProfileByEmail(
    email: string,
    client?: PoolClient
  ): Promise<ProfileView | null> {
    const res = await query<ProfileView>(
      `
        SELECT usr.email, pro.first_name, pro.last_name, pro.image_url
        FROM profiles AS pro
        LEFT JOIN users AS usr ON pro.user_id = usr.id
        WHERE usr.email = $1;
      `,
      [email],
      client
    );

    return res[0] || null;
  },

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

  async updateProfile(
    userId: number,
    params: UpdateProfileParams,
    client?: PoolClient
  ): Promise<ProfileView | null> {
    const fields: string[] = [];
    const values: (string | number)[] = [];
    let idx = 1;

    if (params.first_name !== undefined) {
      fields.push(`first_name = $${idx++}`);
      values.push(params.first_name);
    }

    if (params.last_name !== undefined) {
      fields.push(`last_name = $${idx++}`);
      values.push(params.last_name);
    }

    if (fields.length === 0) return null;

    values.push(userId);

    const sql = `
      WITH updated AS (
        UPDATE profiles
        SET ${fields.join(", ")}, updated_on = NOW()
        WHERE user_id = $${idx}
        RETURNING id, user_id, first_name, last_name, image_url
      )
      SELECT usr.email, upd.first_name, upd.last_name, upd.image_url
      FROM updated AS upd
      LEFT JOIN users AS usr ON upd.user_id = usr.id
    `;

    const res = await query<ProfileView>(sql, values, client);

    return res[0] || null;
  },
};

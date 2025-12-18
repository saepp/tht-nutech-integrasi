import type { PoolClient } from "pg";
import type { ServiceView } from "./service.types.js";
import { query } from "@/database/index.js";

export const ServiceRepository = {
  async getServiceByCode(
    code: string,
    client?: PoolClient
  ): Promise<ServiceView | null> {
    const res = await query<ServiceView>(
      `
        SELECT id, code, name, price
        FROM services
        WHERE code = $1;
      `,
      [code],
      client
    );

    return res[0] || null;
  },
};

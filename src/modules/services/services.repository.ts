import type { PoolClient } from "pg";
import type { GetAllServiceResponse, ServiceView } from "./services.types.js";
import { query } from "@/database/index.js";

export const ServiceRepository = {
  async getAllServices(client?: PoolClient): Promise<ServiceView[]> {
    const res = await query<ServiceView>(
      `
        SELECT code, name, icon_url, price
        FROM services;
      `,
      [],
      client
    );

    return res;
  },

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

import { query } from "@/database/index.js";

export const generateInvoiceNumber = async (): Promise<string> => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const res = await query<{ count: string }>(
    `
      SELECT COUNT(*) AS count
      FROM transactions
      WHERE TO_CHAR(created_on, 'YYYYMMDD') = $1;
    `,
    [today]
  );
  const count = parseInt(res[0]?.count || "0", 10) + 1;

  const counter = String(count).padStart(4, "0");
  return `INV${today}-${counter}`;
};

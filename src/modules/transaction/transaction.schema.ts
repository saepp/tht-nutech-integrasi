import z from "zod";

export const paymentTransactionSchema = z.object({
  service_code: z
    .string({ message: "Parameter service_code harus berupa string" })
    .nonempty({ message: "Parameter service_code tidak boleh kosong" }),
});

export const transactionHistorySchema = z.object({
  offset: z
    .string({ message: "Parameter offset harus berupa string" })
    .refine((val) => val === undefined || /^\d+$/.test(val), {
      message: "Parameter offset harus berupa angka",
    }),
  limit: z
    .string({ message: "Parameter limit harus berupa string" })
    .optional()
    .refine((val) => val === undefined || /^\d+$/.test(val), {
      message: "Parameter limit harus berupa angka",
    }),
});

export type PaymentTransactionSchema = z.infer<typeof paymentTransactionSchema>;
export type TransactionHistorySchema = z.infer<typeof transactionHistorySchema>;

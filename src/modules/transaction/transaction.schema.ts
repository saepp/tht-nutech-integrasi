import z from "zod";

export const paymentTransactionSchema = z.object({
  service_code: z
    .string({ message: "Parameter service_code harus berupa string" })
    .nonempty({ message: "Parameter service_code tidak boleh kosong" }),
});

export type PaymentTransactionSchema = z.infer<typeof paymentTransactionSchema>;

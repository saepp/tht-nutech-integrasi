import z from "zod";

export const topupSchema = z.object({
  top_up_amount: z
    .number({
      message:
        "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    })
    .min(1, {
      message:
        "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    }),
});

export type TopupSchema = z.infer<typeof topupSchema>;

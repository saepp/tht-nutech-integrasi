import z from "zod";

export const updateProfileSchema = z
  .object({
    first_name: z
      .string({ message: "Parameter first_name harus berupa string" })
      .optional(),
    last_name: z
      .string({ message: "Parameter last_name harus berupa string" })
      .optional(),
  })
  .refine(
    (data) => data.first_name !== undefined || data.last_name !== undefined,
    {
      message: "Minimal salah satu field harus diisi",
      path: ["first_name", "last_name"],
    }
  );

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

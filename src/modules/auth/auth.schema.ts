import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ message: "Parameter email tidak sesuai format" }),
  first_name: z
    .string({ message: "Parameter first_name harus berupa string" })
    .min(1, { message: "Parameter first_name tidak boleh kosong" }),
  last_name: z
    .string({ message: "Parameter last_name harus berupa string" })
    .min(1, { message: "Parameter last_name tidak boleh kosong" }),
  password: z
    .string({ message: "Parameter password harus berupa string" })
    .min(8, { message: "Parameter password minimal 8 karakter" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Parameter email tidak sesuai format" }),
  password: z
    .string()
    .min(8, { message: "Parameter password minimal 8 karakter" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

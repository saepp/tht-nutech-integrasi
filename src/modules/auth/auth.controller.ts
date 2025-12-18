import type { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { AuthService } from "./auth.service.js";
import { sendSuccess } from "@/utils/response.js";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, first_name, last_name, password } = registerSchema.parse(
        req.body
      );

      await AuthService.register({
        email,
        first_name,
        last_name,
        password,
      });

      return sendSuccess(res, "Registrasi berhasil silahkan login", null);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const token = await AuthService.login(email, password);

      return sendSuccess(res, "Login berhasil", { token });
    } catch (error) {
      next(error);
    }
  },
};

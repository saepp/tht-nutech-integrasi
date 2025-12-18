import { transaction } from "@/database/index.js";
import { AuthRepository } from "./auth.repository.js";
import { ApiError } from "@/utils/errors.js";
import { comparePassword, hashPassword } from "@/utils/password.js";
import { ProfileRepository } from "../profile/profile.repository.js";
import { signToken } from "@/utils/token.js";

interface RegisterParams {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const AuthService = {
  async register(params: RegisterParams): Promise<Boolean> {
    return transaction(async (client): Promise<Boolean> => {
      const existing = await AuthRepository.findByEmail(params.email, client);
      if (existing) throw new ApiError("Email sudah terdaftar", 101, 409);

      const hashedPassword = await hashPassword(params.password);

      const user = await AuthRepository.createUser(
        params.email,
        hashedPassword,
        client
      );
      if (!user) throw new ApiError("Gagal membuat user", 103, 500);

      const profile = await ProfileRepository.createProfile(
        user.id,
        params.first_name,
        params.last_name,
        client
      );
      if (!profile) throw new ApiError("Gagal membuat profil", 104, 500);

      return true;
    });
  },

  async login(email: string, password: string): Promise<string> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new ApiError("Username atau password salah", 103, 401);

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      throw new ApiError("Username atau password salah", 103, 401);

    const token = signToken(user.email);
    return token;
  },
};

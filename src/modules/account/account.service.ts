import { ApiError } from "@/utils/errors.js";
import { AccountRepository } from "./account.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";

export const AccountService = {
  async getAccountByUserId(email: string): Promise<{ balance: number }> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

    const account = await AccountRepository.getAccountByUserId(user.id);
    if (!account) throw new ApiError("Akun tidak ditemukan", 107, 404);

    const balance = parseFloat(account?.balance ?? "0");

    return { balance };
  },
};

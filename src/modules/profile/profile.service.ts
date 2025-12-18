import { ApiError } from "@/utils/errors.js";
import { AuthRepository } from "../auth/auth.repository.js";
import { ProfileRepository } from "./profile.repository.js";
import type { ProfileView, UpdateProfileParams } from "./profile.types.js";

export const ProfileService = {
  async getProfile(email: string): Promise<ProfileView | null> {
    const profile = await ProfileRepository.getProfileByEmail(email);

    return profile;
  },

  async updateProfile(
    email: string,
    params: UpdateProfileParams
  ): Promise<ProfileView | null> {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new ApiError("User tidak ditemukan", 106, 404);

    const updatedProfile = await ProfileRepository.updateProfile(
      user.id,
      params
    );

    return updatedProfile;
  },
};

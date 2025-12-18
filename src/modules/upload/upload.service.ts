import { ApiError } from "@/utils/errors.js";
import type { UploadedFile, UploadResult } from "./upload.types.js";
import { generateFileKey } from "@/utils/file.js";
import { UploadRepository } from "./upload.repository.js";
import { S3_BUCKET_NAME } from "@/config/s3.js";
import { env } from "@/config/env.js";
import { ProfileRepository } from "../profile/profile.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";
import type { ProfileView } from "../profile/profile.types.js";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const AWS_REGION = env.AWS_REGION;

export const UploadService = {
  async uploadImage(file: UploadedFile): Promise<UploadResult> {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new ApiError("Format Image tidak sesuai", 102, 400);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new ApiError("Ukuran file melebihi batas maksimal 2MB", 115, 400);
    }

    const key = generateFileKey(file.originalname);

    await UploadRepository.uploadObject(key, file.buffer, file.mimetype);

    const url = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    return { key, url };
  },

  async uploadProfileImage(
    email: string,
    file: UploadedFile
  ): Promise<ProfileView> {
    const uploadResult = await this.uploadImage(file);

    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      throw new ApiError("User tidak ditemukan", 106, 404);
    }

    const updatedProfileImage = await ProfileRepository.updateProfileImage(
      user.id,
      uploadResult.url
    );
    if (!updatedProfileImage) {
      throw new ApiError("Gagal memperbarui gambar profil", 117, 500);
    }

    return updatedProfileImage;
  },
};

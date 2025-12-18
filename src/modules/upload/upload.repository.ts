import { S3_BUCKET_NAME, s3Client } from "@/config/s3.js";
import { ApiError } from "@/utils/errors.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const UploadRepository = {
  async uploadObject(
    key: string,
    fileBuffer: Buffer,
    contentType: string
  ): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      });

      await s3Client.send(command);
    } catch (error: unknown) {
      throw new ApiError(
        "Gagal mengunggah file ke S3: " +
          (error instanceof Error ? error.message : String(error)),
        118,
        500
      );
    }
  },
};

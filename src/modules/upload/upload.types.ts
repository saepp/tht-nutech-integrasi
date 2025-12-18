export interface UploadResult {
  url: string;
  key: string;
}

export interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

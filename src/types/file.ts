export interface FileUpload {
  message: string;
  filename: string;
  path: string;
}

export type UploadResult = FileUpload;

export interface UploadPayload {
  data: FormData;
}

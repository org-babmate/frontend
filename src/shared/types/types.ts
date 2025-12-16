export interface Currency {
  currency: 'KRW' | 'USD' | 'EUR' | 'JPY' | 'CNY' | 'GBP' | 'THB' | 'VND';
}

export type ImageUploadFolder = 'users' | 'hosts' | 'experiences' | 'reviews';

export interface ImageFileMeta {
  fileName: string;
  contentType: string;
}

export interface CreateMultipleImageUploadRequest {
  folder: ImageUploadFolder;
  files: ImageFileMeta[];
}

export interface CreateSingleImageUploadRequest {
  folder: 'users' | 'hosts';
  file: ImageFileMeta;
}

export interface ImageUploadUrl {
  uploadUrl: string;
  publicUrl: string;
}

export interface PresignedImageUploadResponse {
  images: ImageUploadUrl[];
}

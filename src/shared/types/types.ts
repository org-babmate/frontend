export interface Currency {
  currency: 'KRW' | 'USD' | 'EUR' | 'JPY' | 'CNY' | 'GBP' | 'THB' | 'VND';
}

export interface ImageFiles {
  folder?: 'users' | 'hosts' | 'experiences' | 'reviews';
  fileName: string;
  contentType: 'image/jpeg';
}
export interface ImageUrls {
  uploadUrl: string;
  publicUrl: string;
}

export interface PresignedUrlRequest {
  folder: 'users' | 'hosts' | 'experiences' | 'reviews';
  files: ImageFiles[];
}

export interface PresignedUrlResponse {
  images: ImageUrls[];
}

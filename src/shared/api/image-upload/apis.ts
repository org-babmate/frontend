// folder: users, hosts, experiences, reviews 최대 파일 수: 6개 유효시간: 10분

import { apiClient } from '@/shared/api/client';
import { ImageUrls, PresignedUrlResponse } from '@/shared/types/types';

// POST: /api/upload/presigned-url
export async function uploadImages(): Promise<PresignedUrlResponse> {
  const res = await apiClient.get<PresignedUrlResponse>('/upload/presigned-url');
  return res.data;
}

// POST: /api/upload/presigned-url/single
export async function uploadImage(): Promise<ImageUrls> {
  const res = await apiClient.get<ImageUrls>('/upload/presigned-url/single');
  return res.data;
}

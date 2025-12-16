// folder: users, hosts, experiences, reviews 최대 파일 수: 6개 유효시간: 10분

import { apiClient } from '@/shared/api/client';
import {
  CreateSingleImageUploadRequest,
  ImageUploadUrl,
  PresignedImageUploadResponse,
} from '@/shared/types/types';

// POST: /api/upload/presigned-url
// export async function uploadImages(): Promise<PresignedImageUploadResponse> {
//   const res = await apiClient.post<PresignedImageUploadResponse>('/upload/presigned-url');
//   return res.data;
// }

// POST: /api/upload/presigned-url/single
export async function uploadImage({
  imageFile,
  folder,
  file,
}: { imageFile: File } & CreateSingleImageUploadRequest): Promise<ImageUploadUrl> {
  const { data: presigned } = await apiClient.post<ImageUploadUrl>('/upload/presigned-url/single', {
    folder,
    fileName: file.fileName,
    contentType: file.contentType,
  });
  // const putResponse = await apiClient.put(presigned.uploadUrl, imageFile, {
  //   headers: { 'Content-Type': file.contentType ?? imageFile.type },
  // });
  const putResponse = await fetch(presigned.uploadUrl, {
    method: 'PUT',
    headers: {
      // presigned 생성 시 사용한 contentType과 반드시 일치해야 함
      'Content-Type': file.contentType ?? imageFile.type,
    },
    body: imageFile, // File / Blob 그대로
  });

  if (!putResponse.ok) {
    throw new Error(`Presigned upload failed: ${putResponse.status} ${putResponse.statusText}`);
  }
  return {
    uploadUrl: presigned.uploadUrl,
    publicUrl: presigned.publicUrl,
  };
}

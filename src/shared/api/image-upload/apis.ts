// folder: users, hosts, experiences, reviews 최대 파일 수: 6개 유효시간: 10분

import { apiClient } from '@/shared/api/client';
import {
  CreateMultipleImageUploadRequest,
  CreateSingleImageUploadRequest,
  ImageUploadUrl,
  PresignedImageUploadResponse,
} from '@/shared/types/types';

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
    fileSize: file.fileSize,
  });
  const putResponse = await fetch(presigned.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.contentType ?? imageFile.type,
    },
    body: imageFile,
  });

  if (!putResponse.ok) {
    throw new Error(`Presigned upload failed: ${putResponse.status} ${putResponse.statusText}`);
  }
  return {
    uploadUrl: presigned.uploadUrl,
    publicUrl: presigned.publicUrl,
  };
}

// POST: /api/upload/presigned-url
export async function uploadImages({
  imageFiles,
  files,
  folder,
}: CreateMultipleImageUploadRequest): Promise<string[]> {
  const { data } = await apiClient.post<ImageUploadUrl[]>('/upload/presigned-url', {
    folder,
    files: files.map((file) => ({
      fileName: file.fileName,
      contentType: file.contentType,
      fileSize: file.fileSize,
    })),
  });
  if (!data || !Array.isArray(data)) {
    throw new Error('Invalid presigned response: items is missing');
  }
  await Promise.all(
    data.map((item, index) =>
      fetch(item.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': files[index].contentType,
        },
        body: imageFiles[index],
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Upload failed (${imageFiles[index]}): ${res.status} ${res.statusText}`);
        }
      }),
    ),
  );

  return data.map((item) => item.publicUrl);
}

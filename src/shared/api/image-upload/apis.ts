// folder: users, hosts, experiences, reviews 최대 파일 수: 6개 유효시간: 10분

import { apiClient } from '@/shared/api/client';
import { CreateMultipleImageUploadRequest, ImageUploadUrl } from '@/shared/types/types';

// POST: /api/upload/presigned-url
export async function uploadImages({
  imageFiles,
  files,
  folder,
}: CreateMultipleImageUploadRequest): Promise<string[]> {
  const { data } = await apiClient.post<ImageUploadUrl[]>('/upload/presigned-urls', {
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

// 통화(currency): KRW, USD, EUR, JPY, CNY, GBP, THB, VND
// 상태(status): Open, Closed, Completed (기본값: OPEN)
// 필수 조건: 사진(photos) 또는 영상(videoUrl) 중 최소 1개 필요

import { CommonResponse } from '@/entities/auth/model/types';
import {
  Experience,
  ExperienceDetail,
  ExperienceRequest,
  ExperienceResponse,
  ScheduleLists,
} from '@/entities/experiences/model/types';
import { apiClient } from '@/shared/api/client';
import { uploadImages } from '@/shared/api/image-upload/apis';
import { CreateMultipleImageUploadRequest } from '@/shared/types/types';

//POST: /experiences 등록
//GET: /experiences/{id} 조회
//PATCH /experiences/{id} 수정
//DELETE /experiences/{id} 삭제

export async function registerHostExperience({
  payload,
  imageFiles,
  files,
  folder,
}: CreateMultipleImageUploadRequest & ExperienceRequest): Promise<ExperienceResponse> {
  const uploaded = await uploadImages({
    imageFiles: imageFiles,
    folder: folder,
    files: files,
  });
  const experienceResponse = await apiClient.post<ExperienceDetail>('/host/experiences', {
    ...payload,
    photos: uploaded,
  });
  return {
    experienceDetail: experienceResponse.data,
  };
}

export async function updateHostExperience({
  payload,
  id,
  imageFiles,
  files,
  folder,
}: CreateMultipleImageUploadRequest & ExperienceRequest): Promise<Experience> {
  const uploaded = await uploadImages({
    imageFiles: imageFiles,
    folder: folder,
    files: files,
  });
  const res = await apiClient.patch<Experience>(`/host/experiences/${id}`, {
    ...payload,
    photos: uploaded,
  });
  return res.data;
}

export async function deleteHostExperience({ id }: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(`/host/experiences/${id}`);
  return res.data;
}

// export async function registerHostSchedule({
//   payload,
//   id,
// }: ExperienceRequest): Promise<ScheduleLists> {
//   const res = await apiClient.post<ScheduleLists>(`/host/experiences/${id}/schedules`, payload);
//   return res.data;
// }

// export async function deleteHostSchedule({
//   payload,
//   id,
//   scheduleId,
// }: ExperienceRequest): Promise<CommonResponse> {
//   const res = await apiClient.delete<CommonResponse>(
//     `/host/experiences/${id}/schedules/${scheduleId}`,
//   );
//   return res.data;
// }

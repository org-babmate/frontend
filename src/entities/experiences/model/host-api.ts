// 통화(currency): KRW, USD, EUR, JPY, CNY, GBP, THB, VND
// 상태(status): Open, Closed, Completed (기본값: OPEN)
// 필수 조건: 사진(photos) 또는 영상(videoUrl) 중 최소 1개 필요

import { CommonResponse } from '@/entities/auth/model/types';
import {
  Experience,
  ExperienceDetail,
  ExperienceRequest,
  ExperienceResponse,
  ExperienceScheduleRequest,
  Schedules,
} from '@/entities/experiences/model/types';
import { apiClient } from '@/shared/api/client';
import { uploadImage, uploadImages } from '@/shared/api/image-upload/apis';
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
  schedules,
}: CreateMultipleImageUploadRequest &
  ExperienceRequest &
  ExperienceScheduleRequest): Promise<ExperienceResponse> {
  const uploaded = await uploadImages({
    imageFiles: imageFiles,
    folder: folder,
    files: files,
  });
  const experienceResponse = await apiClient.post<ExperienceDetail>('/host/experiences', {
    ...payload,
    photos: uploaded,
  });
  const scheduleResponse = await apiClient.post<ExperienceScheduleRequest>(
    `/host/experiences/${experienceResponse.data.id}/schedules`,
    {
      schedules: schedules,
    },
  );
  return {
    schedules: scheduleResponse.data.schedules,
    experienceDetail: experienceResponse.data,
  };
}

export async function updateHostExperience({
  payload,
  id,
}: ExperienceRequest): Promise<Experience> {
  const res = await apiClient.patch<Experience>(`/host/experiences/${id}`, payload);
  return res.data;
}

export async function deleteHostExperience({
  payload,
  id,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(`/host/experiences/${id}`);
  return res.data;
}

export async function registerHostSchedule({ payload, id }: ExperienceRequest): Promise<Schedules> {
  const res = await apiClient.post<Schedules>(`/host/experiences/${id}/schedules`, payload);
  return res.data;
}

export async function deleteHostSchedule({
  payload,
  id,
  scheduleId,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(
    `/host/experiences/${id}/schedules/${scheduleId}`,
  );
  return res.data;
}

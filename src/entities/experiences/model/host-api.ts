// 통화(currency): KRW, USD, EUR, JPY, CNY, GBP, THB, VND
// 상태(status): Open, Closed, Completed (기본값: OPEN)
// 필수 조건: 사진(photos) 또는 영상(videoUrl) 중 최소 1개 필요

import { CommonResponse } from '@/entities/auth/model/types';
import { Experience, ExperienceRequest, Schedules } from '@/entities/experiences/model/types';
import { apiClient } from '@/shared/api/client';

//POST: /experiences 등록
//GET: /experiences/{id} 조회
//PATCH /experiences/{id} 수정
//DELETE /experiences/{id} 삭제

export async function registerHostExperience({ payload }: ExperienceRequest): Promise<Experience> {
  const res = await apiClient.post<Experience>('/experiences', payload);
  return res.data;
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

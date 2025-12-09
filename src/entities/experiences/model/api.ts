// 통화(currency): KRW, USD, EUR, JPY, CNY, GBP, THB, VND
// 상태(status): Open, Closed, Completed (기본값: OPEN)
// 필수 조건: 사진(photos) 또는 영상(videoUrl) 중 최소 1개 필요

import { CommonResponse } from '@/entities/auth/model/types';
import { Experience } from '@/entities/experiences/model/types';
import { apiClient } from '@/shared/api/client';

//POST: /experiences 등록
//GET: /experiences/{id} 조회
//PATCH /experiences/{id} 수정
//DELETE /experiences/{id} 삭제

interface ExperienceProps {
  payload?: Experience;
  id?: string;
}

export async function registerExperience({ payload }: ExperienceProps): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/experience', payload);
  return res.data;
}

export async function getExperience({ id }: ExperienceProps): Promise<CommonResponse> {
  const res = await apiClient.get<CommonResponse>(`/experience/${id}`);
  return res.data;
}

export async function updateExperience({ payload, id }: ExperienceProps): Promise<CommonResponse> {
  const res = await apiClient.patch<CommonResponse>(`/experience/${id}`, payload);
  return res.data;
}

export async function deleteExperience({ payload, id }: ExperienceProps): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(`/experience/${id}`);
  return res.data;
}

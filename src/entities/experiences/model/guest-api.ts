// 통화(currency): KRW, USD, EUR, JPY, CNY, GBP, THB, VND
// 상태(status): Open, Closed, Completed (기본값: OPEN)
// 필수 조건: 사진(photos) 또는 영상(videoUrl) 중 최소 1개 필요

import { CommonResponse } from '@/entities/auth/model/types';
import { ExperienceRequest } from '@/entities/experiences/model/types';
import { apiClient } from '@/shared/api/client';

//POST: /experiences 등록
//GET: /experiences/{id} 조회
//PATCH /experiences/{id} 수정
//DELETE /experiences/{id} 삭제

export async function registerGuestExperience({
  payload,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/experiences', payload);
  return res.data;
}

export async function getGuestExperience({ id }: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.get<CommonResponse>(`/experiences/${id}`);
  return res.data;
}

export async function updateGuestExperience({
  payload,
  id,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.patch<CommonResponse>(`/experiences/${id}`, payload);
  return res.data;
}

export async function deleteGuestExperience({
  payload,
  id,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(`/experiences/${id}`);
  return res.data;
}

export async function registerGuestSchedule({
  payload,
  id,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>(`/experiences/${id}/schedules`, payload);
  return res.data;
}

export async function getGuestSchedule({
  payload,
  id,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>(`/experiences/${id}/schedules`, payload);
  return res.data;
}

export async function deleteGuestSchedule({
  payload,
  id,
  scheduleId,
}: ExperienceRequest): Promise<CommonResponse> {
  const res = await apiClient.delete<CommonResponse>(`/experiences/${id}/schedules/${scheduleId}`);
  return res.data;
}

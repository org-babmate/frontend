import { apiClient } from '@/shared/api/client';
import {
  ExperienceListParams,
  ExperienceListResponse,
  ExperienceDetail,
  ExperienceSchedule,
  ExperienceResponse,
  Schedules,
} from './types';

// GET: /experiences/categories
export async function getCategories(): Promise<string[]> {
  const res = await apiClient.get<string[]>('/experiences/categories');
  return res.data;
}

// GET: /experiences (List)
export async function getExperiences(
  params: ExperienceListParams,
): Promise<ExperienceListResponse> {
  const res = await apiClient.get<ExperienceListResponse>('/experiences', { params });
  return res.data;
}

// GET: /experiences/{id} (Detail)
export async function getExperience(id: string): Promise<ExperienceResponse> {
  const experienceRespoonse = await apiClient.get<ExperienceDetail>(`/experiences/${id}`);
  const scheduleReponse = await apiClient.get<Schedules[]>(
    `/experiences/${experienceRespoonse.data.id}/schedules`,
  );
  return {
    experienceDetail: experienceRespoonse.data,
    schedules: scheduleReponse.data,
  };
}

// GET: /experiences/{id}/schedules (Schedules)
export async function getExperienceSchedules(id: string): Promise<ExperienceSchedule[]> {
  const res = await apiClient.get<ExperienceSchedule[]>(`/experiences/${id}/schedules`);
  return res.data;
}

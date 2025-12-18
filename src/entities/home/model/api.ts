import { HomeResponse } from '@/entities/home/model/type';
import { apiClient } from '@/shared/api/client';

export async function getHomeFeed(): Promise<HomeResponse> {
  const res = await apiClient.get<HomeResponse>('/home');
  return res.data;
}

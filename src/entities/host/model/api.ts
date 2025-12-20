import { CommonResponse } from '@/entities/auth/model/types';
import { HostProfile, HostProfileDetail } from '@/entities/host/model/types';
import { apiClient } from '@/shared/api/client';

//GET: /api/hosts/me 내프로필 조회
export async function getMyHostProfile(): Promise<HostProfile> {
  const res = await apiClient.get<HostProfile>('/host/me');
  return res.data;
}

export async function getHostIDProfile(): Promise<HostProfileDetail> {
  const hostDetail = await apiClient.get<HostProfileDetail>('/host/me');
  return hostDetail.data;
}

//POST: /api/hosts  내 프로필 등록
export async function registerMyHostProfile(payload: HostProfile): Promise<HostProfile> {
  const res = await apiClient.post<HostProfile>('/host', payload);
  return res.data;
}

//PATCH: /api/hosts/me 프로필 수정
export async function updateMyHostProfile(payload: HostProfile): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/host/me', payload);
  return res.data;
}

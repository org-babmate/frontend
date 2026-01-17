import {
  HostListParams,
  HostListResponse,
  HostProfile,
  HostProfileDetail,
} from '@/entities/host/model/types';
import { apiClient } from '@/shared/api/client';

//GET: /api/hosts/me 내 호스트 프로필 조회
export async function getMyHostProfile(): Promise<HostProfileDetail> {
  const hostDetail = await apiClient.get<HostProfileDetail>('/host/me');
  return hostDetail.data;
}
//GET: /api/hosts/me 특정 호스트 프로필 조회
export async function getHostIDProfile(id: string): Promise<HostProfileDetail> {
  const hostDetail = await apiClient.get<HostProfileDetail>(`/hosts/${id}`);
  return hostDetail.data;
}
//GET: /api/hosts/me  호스트 프로필 목록 조회 무한 스크롤
export async function getHostList(params: HostListParams) {
  const res = await apiClient.get<HostListResponse>(`/hosts`, { params });
  return res.data;
}

//POST: /api/hosts  내 프로필 등록
export async function registerMyHostProfile(payload: HostProfile): Promise<HostProfile> {
  const res = await apiClient.post<HostProfile>('/host', payload);
  return res.data;
}

//PATCH: /api/hosts/me 프로필 수정
export async function updateMyHostProfile(payload: HostProfile): Promise<HostProfile> {
  const { id, ...body } = payload;
  const res = await apiClient.patch<HostProfile>('/host/me', body);
  return res.data;
}

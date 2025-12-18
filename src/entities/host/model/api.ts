import { CommonResponse } from '@/entities/auth/model/types';
import { HostProfileImage, HostProfiles } from '@/entities/host/model/types';
import { ProfilePayload } from '@/features/host-profile/ui/host-profile';
import { apiClient } from '@/shared/api/client';

//GET: /api/hosts/me 내프로필 조회
export async function getHostProfile(): Promise<HostProfiles> {
  const res = await apiClient.get<HostProfiles>('/hosts/me');
  return res.data;
}

//POST: /api/hosts/me/profile-image => multipart/form-data
// export async function uploadHostProfileImage({ file }: { file: File }): Promise<HostProfileImage> {
//   const res = await apiClient.post<HostProfileImage>('/hosts/me/profile-image', file, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return res.data;
// }

//POST: /api/hosts  내 프로필 등록
export async function registerHostProfile(payload: ProfilePayload): Promise<ProfilePayload> {
  const res = await apiClient.post<ProfilePayload>('/host', payload);
  return res.data;
}

//PATCH: /api/hosts/me 프로필 수정
export async function updateHostProfile(payload: HostProfiles): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/hosts/me', payload);
  return res.data;
}

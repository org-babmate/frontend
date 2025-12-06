import { CommonResponse } from '@/entities/auth/model/types';
import { UserProfile, UserProfileImage } from '@/entities/user/model/types';
import { apiClient } from '@/shared/api/client';

//GET: /api/users/me 내프로필 조회
export async function getUserProfile(): Promise<CommonResponse> {
  const res = await apiClient.post<CommonResponse>('/hosts/me');
  return res.data;
}

//POST: /api/users/me/profile-image => multipart/form-data
export async function uploadUserProfileImage({ file }: { file: File }): Promise<UserProfileImage> {
  const res = await apiClient.post<UserProfileImage>('/users/me/profile-image', file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

//PATCH: /api/users/me 프로필 수정
export async function updateUserProfileImage(payload: UserProfile): Promise<CommonResponse> {
  const res = await apiClient.patch<CommonResponse>('/hosts/me', payload);
  return res.data;
}

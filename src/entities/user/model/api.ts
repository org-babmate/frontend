import {
  UserProfileRequest,
  UserProfileImage,
  UserProfileResponse,
} from '@/entities/user/model/types';
import { apiClient } from '@/shared/api/client';

//GET: /api/users/me 내프로필 조회
export async function getUserProfile(): Promise<UserProfileResponse> {
  const res = await apiClient.get<UserProfileResponse>('/users/me');
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
export async function updateUserProfileImage(
  payload: UserProfileRequest,
): Promise<UserProfileResponse> {
  const res = await apiClient.patch<UserProfileResponse>('/users/me', payload);
  return res.data;
}

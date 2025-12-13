import { UserProfileRequest, UserProfileResponse } from '@/entities/user/model/types';
import { apiClient } from '@/shared/api/client';
import { ImageUrls } from '@/shared/types/types';

//GET: /api/users/me 내프로필 조회
export async function getUserProfile(): Promise<UserProfileResponse> {
  const res = await apiClient.get<UserProfileResponse>('/users/me');
  return res.data;
}

//PATCH: /api/users/me 프로필 수정
export async function updateUserProfileImage(
  payload: UserProfileRequest,
): Promise<UserProfileResponse> {
  const imageResponse = await apiClient.get<ImageUrls>('/upload/presigned-url/single');
  const res = await apiClient.patch<UserProfileResponse>('/users/me', {});
  return res.data;
}

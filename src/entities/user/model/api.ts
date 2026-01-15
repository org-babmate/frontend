import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { UserProfileRequest, UserProfileResponse } from '@/entities/user/model/types';
import { apiClient } from '@/shared/api/client';
import { uploadImages } from '@/shared/api/image-upload/apis';

//GET: /api/users/me 내프로필 조회
export async function getUserProfile(): Promise<UserProfileResponse> {
  const res = await apiClient.get<UserProfileResponse>('/user/me');
  return res.data;
}

//PATCH: /api/users/me 프로필 수정
export async function updateUserProfile(payload: UserProfileRequest): Promise<UserProfileResponse> {
  try {
    const { name, mode } = useUserStore.getState();
    function isFile(v: unknown): v is File {
      return typeof File !== 'undefined' && v instanceof File;
    }

    let profileImageUrl: string | null | undefined;

    if (isFile(payload.profileImage)) {
      const uploaded = await uploadImages({
        imageFiles: [payload.profileImage],
        folder: mode,
        files: [
          {
            fileName: `${name}-profileImage`,
            contentType: payload.profileImage.type || 'image/jpeg',
            fileSize: payload.profileImage.size,
          },
        ],
      });
      profileImageUrl = uploaded[0];
    } else if (typeof payload.profileImage === 'string') {
      profileImageUrl = payload.profileImage;
    } else if (payload.profileImage === null) {
      profileImageUrl = null;
    }

    const res = await apiClient.patch<UserProfileResponse>('/user/me', {
      ...payload,
      profileImage: profileImageUrl,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

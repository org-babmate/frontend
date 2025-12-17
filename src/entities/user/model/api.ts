import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { ImageFileMeta } from './../../../shared/types/types';
import { UserProfileRequest, UserProfileResponse } from '@/entities/user/model/types';
import { apiClient } from '@/shared/api/client';
import { uploadImage } from '@/shared/api/image-upload/apis';
import axios from 'axios';

//GET: /api/users/me 내프로필 조회
export async function getUserProfile(): Promise<UserProfileResponse> {
  const res = await apiClient.get<UserProfileResponse>('/user/me');
  return res.data;
}
function logAxiosError(err: unknown, label = 'error') {
  if (axios.isAxiosError(err)) {
    console.error(`[${label}] axios`, {
      message: err.message,
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
      url: err.config?.url,
      method: err.config?.method,
    });
  } else {
    console.error(`[${label}]`, err);
  }
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
      const uploaded = await uploadImage({
        imageFile: payload.profileImage,
        folder: mode,
        file: {
          fileName: `${name}-profileImage`,
          contentType: payload.profileImage.type || 'image/jpeg',
        },
      });
      profileImageUrl = uploaded.publicUrl;
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

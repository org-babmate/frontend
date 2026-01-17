export type ProfileImageInput = File | string | null;

export interface UserProfileRequest {
  profileImage: ProfileImageInput;
  name: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
}

export interface UserProfileResponse {
  id?: string;
  email?: string;
  name: string;
  isEmailVerified?: boolean;
  profileImage: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
}

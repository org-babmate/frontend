export interface UserProfileRequest {
  profileImage: File | string;
  name: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
  personalities: string[];
}

export interface UserProfileResponse {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  profileImage: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
  personalities: string[];
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

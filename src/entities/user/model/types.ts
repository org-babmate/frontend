export interface UserProfileRequest {
  name: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
  personalities: string[];
}

export interface UserProfileImage {
  profileImage: File;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  name: string;
  provider: 'Local'; // 이거 쓸데가 있나 ?
  providerId: string;
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

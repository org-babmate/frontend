export interface UserProfile {
  name: string;
  aboutMe: string;
  languages: string[];
  interests: string[];
  personalities: string[];
}

export interface UserProfileImage {
  profileImage: File;
}

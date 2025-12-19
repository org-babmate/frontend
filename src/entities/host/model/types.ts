export interface HostProfileImage {
  profileImage: String;
}

export interface HostProfile {
  id?: string;
  profileImage: string;
  nickname: string;
  popBadge: string[];
  tagline: string;
  aboutMe: string;
  socialLinks: SocialLinks;
  area: string;
  languages: string[];
  restaurantStyles: string[];
  flavorPreferences: string[];
  favoriteFood: string;
  signatureDish: string;
}

export interface HostProfileExperiences {
  id: 'string';
  category: 'string';
  title: 'string';
  description: 'string';
  price: 0;
  currency: 'KRW';
  durationHours: 2.5;
  meetingPlace: 'string';
  photos: ['string'];
}

export interface HostProfileDetail {
  host: HostProfile;
  experiences: HostProfileExperiences[];
  categories: string[];
}

export type SocialLinks = {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
};

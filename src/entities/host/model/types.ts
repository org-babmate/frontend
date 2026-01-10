import { Language } from '@/shared/data/languageList';
import { SeoulLocation } from '@/shared/data/locations';
import { MoodTag } from '@/shared/data/moodTag';
import { PopbadgeName } from '@/shared/data/popbadges';
import { TasteTag } from '@/shared/data/tasteList';
import { Currency } from '@/shared/types/types';

export interface HostProfileImage {
  profileImage: String;
}

export interface HostProfile {
  id?: string;
  profileImage: string;
  nickname: string;
  popBadge: PopbadgeName[];
  tagline: string;
  aboutMe: string;
  socialLinks: SocialLinks;
  area: string;
  languages: Language[];
  restaurantStyles: MoodTag[];
  flavorPreferences: TasteTag[];
  favoriteFood: string;
  signatureDish: string;
}

//FIX: TYPE FIX
export interface HostProfileExperiences {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  durationHours: number;
  meetingPlace: string;
  meetingArea: string;
  photos: string[];
}

export interface HostProfileDetail {
  host: HostProfile;
  experiences: HostProfileExperiences[];
  categories: string[];
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
}

export interface HostListResponse {
  results: HostListItem[];
  nextCursor: string;
  hasNext: boolean;
  limit: number;
}
export interface HostListParams {
  cursor?: string;
  limit?: number;
}

export interface HostListItem {
  id: string;
  profileImage: string;
  nickname: string;
  popBadge: PopbadgeName[];
  tagline: string;
}

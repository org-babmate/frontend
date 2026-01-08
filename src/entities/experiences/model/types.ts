import { Language } from '@/shared/data/languageList';
import { SeoulLocation } from '@/shared/data/locations';
import { MoodTag } from '@/shared/data/moodTag';
import { PopbadgeName } from '@/shared/data/popbadges';
import { TasteTag } from '@/shared/data/tasteList';
import { Currency } from '@/shared/types/types';

export interface ExperienceCategoryResponse {
  categories: string[];
}

export interface Experience {
  id?: string;
  hostId?: string;
}

export interface ExperienceListParams {
  cursor?: string;
  limit?: number;
  categories?: string[];
  dateFrom?: string;
  dateTo?: string;
  guestCount?: number;
  priceMin?: number;
  priceMax?: number;
  languages?: string;
  minRating?: number;
}

export interface ExperienceSummary {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  durationHours: number;
  meetingPlace: string;
  meetingArea: string;
  photos: string[];
}

export interface ExperienceListResponse {
  results: ExperienceSummary[];
  nextCursor: string;
  hasNext: boolean;
  limit: number;
}

export interface Host {
  id: string;
  userId: string;
  profileImage: string;
  nickname: string;
  popBadge: PopbadgeName[];
  tagline: string;
  aboutMe: string;
  socialLink: string | null;
  area: string;
  languages: Language[];
  restaurantStyles: MoodTag[];
  flavorPreferences: TasteTag[];
  favoriteFood: string;
  signatureDish: string;
  agreedAt: string;
}

export interface ExperienceDetail {
  id?: string;
  hostId?: string;
  host?: Host;
  category: string;
  title: string;
  description: string;
  videoUrl?: any;
  photos: string[];
  durationHours: number;
  meetingPlace: string;
  meetingPlaceLat: number;
  meetingPlaceLng: number;
  destinationPlace: string;
  meetingArea: SeoulLocation;
  destinationPlaceLat: number;
  destinationPlaceLng: number;
  minGuests: number;
  maxGuests: number;
  price: number;
  currency: Currency;
  schedules: ScheduleLists[];
}

export interface ExperienceRequest {
  payload?: ExperienceDetail;
  id?: string;
  scheduleId?: string;
}

export interface ExperienceSchedule {
  id: string;
  experienceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface ExperienceResponse {
  experienceDetail: ExperienceDetail;
}

export interface ExperienceRequest {
  id?: string;
  scheduleId?: string;
  payload?: ExperienceDetail;
}

export interface TimeLine {
  startTime: string;
  endTime: string;
  id?: string;
  status?: 'Open' | 'Closed';
}

export interface ScheduleLists {
  date: string;
  slots: TimeLine[];
}

export type DurationOption = {
  label: string;
  value: number;
};


import { Currency } from "@/shared/types/types";

export interface ExperienceCategoryResponse {
  categories: string[];
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
  profileImage: string;
  nickname: string;
  vibeTags: string[];
  tagline: string;
}

export interface ExperienceDetail {
  id: string;
  hostId: string;
  host: Host;
  category: string;
  title: string;
  description: string;
  videoUrl: any;
  photos: string[];
  durationHours: number;
  meetingPlace: string;
  meetingPlaceLat: number;
  meetingPlaceLng: number;
  destinationPlace: string;
  destinationPlaceLat: number;
  destinationPlaceLng: number;
  minGuests: number;
  maxGuests: number;
  price: number;
  currency: Currency['currency'];
}

export interface Schedules {
  date: string;
  startTime: string;
  endTime: string;
  id?: string;
  experienceId?: string;
  status?: 'Open' | 'Closed';
  currency: string;
  createdAt: string;
}

export interface ExperienceSchedule {
  id: string;
  experienceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

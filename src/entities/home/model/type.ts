import { CategoryValue } from '@/shared/data/categories';
import { PopbadgeName } from '@/shared/data/popbadges';
import { Currency } from '@/shared/types/types';

export interface HomeHosts {
  id: string;
  profileImage: string;
  nickname: string;
  popBadge: PopbadgeName[];
  tagline: string;
}
export interface HomeExperiences {
  id: string;
  category: string;
  title: string;
  description: string;
  photos: string[];
  meetingPlace: string;
  price: string;
  currency: Currency;
  durationHours: string;
}

export interface HomeRecentReviews {
  id?: string;
  rating: number;
  comment: string;
  guestName: string;
  createdAt: string;
  image: string;
}

export interface HomeResponse {
  hosts: HomeHosts[];
  experiences: HomeExperiences[];
  recentReviews: HomeRecentReviews[];
  recentCategories: CategoryValue[];
}

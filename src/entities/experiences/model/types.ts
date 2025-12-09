import { Currency } from '@/shared/types/types';

export interface Experience {
  category: string;
  title: string;
  description: string;
  videoUrl: string;
  photos: string[];
  meetingPlace: string;
  meetingPlaceLat: number;
  meetingPlaceLng: number;
  destinationPlace: string;
  destinationPlaceLat: number;
  destinationPlaceLng: number;
  minGuests: number;
  maxGuests: number;
  price: number;
  currency: Currency;
  date: string;
  startTime: string;
  endTime: string;
}

import { Currency } from '@/shared/types/types';

export interface Experience {
  id?: string;
  hostId?: string;
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
}
export interface ExperienceRequest {
  payload?: Experience;
  id?: string;
  scheduleId?: string;
}

export interface Schedules {
  date: string;
  startTime: string;
  endTime: string;
  id?: string;
  experienceId?: string;
  status?: 'Open' | 'Closed';
}
export interface ExperienceScheduleRequest {
  schedules: Schedules[];
}

// {
//     "id": "13c4beeb-5611-4ee3-a7dd-ff75f3d0f08f",
//     "hostId": "1f9dafd2-cd61-4e72-abac-7dfcd6d83570",
//     "category": "testExperience",
//     "title": "testExperience",
//     "description": "여행은 더 이상 장소를 소비하는 일이 아닙니다. 사람을 만나고, 취향을 나누고, 경험을 쌓는 과정입니다. 당신의 여행 경험은 순간으로 사라지지 않고, 다음 여정을 더 풍부하게 만드는 자산이 됩니다.,여행은 더 이상 장소를 소비하는 일이 아닙니다. 사람을 만나고, 취향을 나누고, 경험을 쌓는 과정입니다. 당신의 여행 경험은 순간으로 사라지지 않고, 다음 여정을 더 풍부하게 만드는 자산이 됩니다.",
//     "videoUrl": "testExperience",
//     "photos": [
//         "testExperience"
//     ],
//     "meetingPlace": "testExperience",
//     "meetingPlaceLat": 0,
//     "meetingPlaceLng": 0,
//     "destinationPlace": "testExperience",
//     "destinationPlaceLat": 0,
//     "destinationPlaceLng": 0,
//     "minGuests": 1,
//     "maxGuests": 10,
//     "price": 0,
//     "currency": "KRW",
//     "createdAt": "2025-12-15T07:59:09.234Z",
//     "updatedAt": "2025-12-15T07:59:09.234Z"
// }

// [
//     {
//         "id": "4964ca8b-4c8b-4a9c-9de0-a318209b69c2",
//         "experienceId": "13c4beeb-5611-4ee3-a7dd-ff75f3d0f08f",
//         "date": "2026-01-15",
//         "startTime": "14:00",
//         "endTime": "17:00",
//         "status": "Open",
//         "createdAt": "2025-12-15T08:00:51.511Z",
//         "updatedAt": "2025-12-15T08:00:51.511Z"
//     }
// ]

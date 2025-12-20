export interface HomeHosts {
  id?: string;
  profileImage: string;
  nickname: string;
  popBadge: ['Foodie', 'Adventurous', 'Friendly'];
  tagline: string;
}
export interface HomeExperiences {
  id: string;
  category: string;
  title: string;
  description: string;
  photos: ['https://example.com/exp1-1.jpg', 'https://example.com/exp1-2.jpg'];
  meetingPlace: string;
  price: string;
  currency: 'KRW' | 'USD';
  durationHours: string;
}

export interface HomeRecentReviews {
  id?: string;
  rating: number;
  comment: string;
  guestName: string;
  createdAt: string;
}

type Categories =
  | 'late-night-eats'
  | 'hidden-gems'
  | 'bite-the-streets'
  | 'cook-together'
  | 'temple-taste'
  | 'snack-attack'
  | 'soju-nights'
  | 'mystery-table'
  | 'delivery-and-chill'
  | 'pop-up-kitchen';

export interface HomeResponse {
  hosts: HomeHosts[];
  experiences: HomeExperiences[];
  recentReviews: HomeRecentReviews[];
  recentCategories: Categories[];
}

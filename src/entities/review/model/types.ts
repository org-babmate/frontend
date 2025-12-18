export interface Review {
  id: string;
  reservationId: string;
  experienceId: string;
  guestId: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
  experienceName: string; 
}

export interface CreateReviewRequest {
  reservationId: string;
  rating: number;
  comment: string;
  images: string[];
}

export interface UpdateReviewRequest {
  rating: number;
  comment: string;
  images: string[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
  experience: {
    id: string;
    title: string;
    thumbnailUrl: string;
    hostName: string;
  };
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

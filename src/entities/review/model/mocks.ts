import { Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    rating: 5,
    comment: "Amazing experience! The host was very friendly.",
    images: [
      "https://example.com/image1.jpg"
    ],
    createdAt: "2025-12-17T12:00:00.000Z",
    experience: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Korean BBQ Night",
      thumbnailUrl: "https://example.com/image.jpg",
      hostName: "John"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    rating: 2.5,
    comment: "Very nice experience!",
    images: [],
    createdAt: "2025-12-16T12:00:00.000Z",
    experience: {
      id: "550e8400-e29b-41d4-a716-446655440006",
      title: "Another Experience",
      thumbnailUrl: "https://example.com/image2.jpg",
      hostName: "Jane"
    }
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    rating: 5.0,
    comment: "Loved the vibe and the people.",
    images: [],
    createdAt: "2025-12-15T12:00:00.000Z",
    experience: {
      id: "550e8400-e29b-41d4-a716-446655440010",
      title: "Great Atmosphere",
      thumbnailUrl: "https://example.com/image3.jpg",
      hostName: "Mike"
    }
  }
];

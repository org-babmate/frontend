import { Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    reservationId: '550e8400-e29b-41d4-a716-446655440001',
    experienceId: '550e8400-e29b-41d4-a716-446655440002',
    guestId: '550e8400-e29b-41d4-a716-446655440003',
    rating: 4.5,
    comment: 'Amazing experience! The host was very friendly.',
    images: ['/a.jpg', '/a.jpg'],
    createdAt: '2025-12-17T12:00:00.000Z',
    experienceName: 'Experience Name',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    reservationId: '550e8400-e29b-41d4-a716-446655440005',
    experienceId: '550e8400-e29b-41d4-a716-446655440006',
    guestId: '550e8400-e29b-41d4-a716-446655440007',
    rating: 2.5,
    comment: 'Very nice experience!',
    images: ['/a.jpg', '/a.jpg'],
    createdAt: '2025-12-16T12:00:00.000Z',
    experienceName: 'Another Experience',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    reservationId: '550e8400-e29b-41d4-a716-446655440009',
    experienceId: '550e8400-e29b-41d4-a716-446655440010',
    guestId: '550e8400-e29b-41d4-a716-446655440011',
    rating: 5.0,
    comment: 'Loved the vibe and the people.',
    images: ['/a.jpg', '/a.jpg'],
    createdAt: '2025-12-15T12:00:00.000Z',
    experienceName: 'Great Atmosphere',
  },
];

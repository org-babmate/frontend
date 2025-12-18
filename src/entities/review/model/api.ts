import { apiClient } from '@/shared/api/client';
import { Review, CreateReviewRequest, UpdateReviewRequest } from './types';

// POST: /user/reviews (Create Review)
export async function createReview(data: CreateReviewRequest): Promise<Review> {
  const res = await apiClient.post<Review>('/user/reviews', data);
  return res.data;
}

// GET: /user/reviews (List Reviews)
export async function getReviews(): Promise<Review[]> {
  const res = await apiClient.get<Review[]>('/user/reviews');
  return res.data;
}

// GET: /user/reviews/{id} (Review Detail)
export async function getReview(id: string): Promise<Review> {
  const res = await apiClient.get<Review>(`/user/reviews/${id}`);
  return res.data;
}

// PATCH: /user/reviews/{id} (Update Review) - TODO: Not used yet
export async function updateReview(id: string, data: UpdateReviewRequest): Promise<Review> {
  // TODO: Implement this when needed
  const res = await apiClient.patch<Review>(`/user/reviews/${id}`, data);
  return res.data;
}

// DELETE: /user/reviews/{id} (Delete Review) - TODO: Not used yet
export async function deleteReview(id: string): Promise<{ message: string }> {
  // TODO: Implement this when needed
  const res = await apiClient.delete<{ message: string }>(`/user/reviews/${id}`);
  return res.data;
}

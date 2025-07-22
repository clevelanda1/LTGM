// Review types
export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

export interface GoogleReviewsResponse {
  success: boolean;
  reviews: Review[];
  count: number;
  error?: string;
  fallback?: boolean;
  message?: string;
}
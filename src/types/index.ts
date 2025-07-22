// Image file declarations
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

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
// Image file declarations
declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const value: string;
    export default value;
  }
  
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
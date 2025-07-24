import { Handler } from '@netlify/functions';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
}

interface GooglePlacesResponse {
  status: string;
  result?: {
    reviews?: GoogleReview[];
  };
  error_message?: string;
}

interface TransformedReview {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { GOOGLE_API_KEY, GOOGLE_LOCATION_ID } = process.env;

    if (!GOOGLE_API_KEY || !GOOGLE_LOCATION_ID) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error',
          fallback: true 
        }),
      };
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_LOCATION_ID}&fields=name,reviews,rating&key=${GOOGLE_API_KEY}`;

    console.log('Making request to Google Places API');

    const response = await fetch(url);
    const data: GooglePlacesResponse = await response.json();

    console.log('Google API response:', data.status);

    if (data.status !== 'OK') {
      console.error('Google API error:', data.status, data.error_message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Google API error: ${data.status}`,
          message: data.error_message,
          fallback: true
        }),
      };
    }

    const reviews: GoogleReview[] = data.result?.reviews || [];
    
    const transformedReviews: TransformedReview[] = reviews.map((review, index) => ({
      id: index + 1,
      name: review.author_name || 'Anonymous',
      location: 'Via Google',
      rating: review.rating || 5,
      text: review.text || 'Great service!',
      image: review.profile_photo_url || `https://images.pexels.com/photos/${1239291 + index}/pexels-photo-${1239291 + index}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    }));

    // Filter for high-rated reviews (4+ stars)
    const goodReviews = transformedReviews
      .filter(review => review.rating >= 4)
      .slice(0, 5);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reviews: goodReviews,
        count: goodReviews.length,
      }),
    };

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch reviews',
        fallback: true,
        message: errorMessage,
      }),
    };
  }
}
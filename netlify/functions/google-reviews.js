exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get environment variables
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

    // Construct Google Places API URL
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_LOCATION_ID}&fields=reviews&key=${GOOGLE_API_KEY}`;

    // Fetch reviews from Google Places API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status}`);
    }

    // Transform Google reviews to match our component structure
    const transformedReviews = data.result?.reviews?.map((review, index) => ({
      id: index + 1,
      name: review.author_name || 'Anonymous',
      location: 'Via Google',
      rating: review.rating || 5,
      text: review.text || 'Great service!',
      image: review.profile_photo_url || `https://images.pexels.com/photos/${1239291 + index}/pexels-photo-${1239291 + index}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    })) || [];

    // Filter for 5-star reviews only and limit to 5 reviews
    const fiveStarReviews = transformedReviews
      .filter(review => review.rating === 5)
      .slice(0, 5);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reviews: fiveStarReviews,
        count: fiveStarReviews.length,
      }),
    };

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch reviews',
        fallback: true,
        message: error.message,
      }),
    };
  }
};
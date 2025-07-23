exports.handler = async (event, context) => {
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
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_LOCATION_ID } = process.env;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_LOCATION_ID) {
      console.error('Missing OAuth environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Server configuration error',
          fallback: true 
        }),
      };
    }

    // For server-to-server, we'll use service account approach instead
    // But first, let's try a simpler approach with just the API key but proper setup
    
    // Actually, let's stick with API key but ensure proper setup
    const { GOOGLE_API_KEY } = process.env;
    
    if (!GOOGLE_API_KEY || !GOOGLE_LOCATION_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Missing API configuration',
          fallback: true 
        }),
      };
    }

    // Use the Places API with proper endpoint
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_LOCATION_ID}&fields=name,reviews,rating&key=${GOOGLE_API_KEY}`;

    console.log('Making request to Google Places API');

    const response = await fetch(url);
    const data = await response.json();

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

    const reviews = data.result?.reviews || [];
    
    const transformedReviews = reviews.map((review, index) => ({
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
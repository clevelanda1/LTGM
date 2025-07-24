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
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) {
      console.error('Missing Google API Key');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Missing API key',
          fallback: true 
        }),
      };
    }

    console.log('Searching for business...');

    const searchUrl = 'https://places.googleapis.com/v1/places:searchText';
    
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress'
      },
      body: JSON.stringify({
        textQuery: 'Lashes To-go and More Houston Texas eyelash salon',
        maxResultCount: 1
      })
    });

    console.log('Search response status:', searchResponse.status);

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Search failed:', searchResponse.status, errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Search failed: ' + searchResponse.status,
          message: errorText,
          fallback: true
        }),
      };
    }

    const searchData = await searchResponse.json();
    console.log('Search results:', JSON.stringify(searchData, null, 2));
    
    if (!searchData.places || searchData.places.length === 0) {
      console.log('No business found in search');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Business not found in search',
          fallback: true
        }),
      };
    }

    const business = searchData.places[0];
    const placeId = business.id;
    
    console.log('Found business:', business.displayName);
    console.log('Place ID:', placeId);

    const detailsUrl = 'https://places.googleapis.com/v1/places/' + placeId;
    
    const detailsResponse = await fetch(detailsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'reviews,displayName,rating,userRatingCount'
      }
    });

    console.log('Details response status:', detailsResponse.status);

    if (!detailsResponse.ok) {
      const errorText = await detailsResponse.text();
      console.error('Details request failed:', detailsResponse.status, errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Details failed: ' + detailsResponse.status,
          message: errorText,
          fallback: true
        }),
      };
    }

    const detailsData = await detailsResponse.json();
    console.log('Got business details with', (detailsData.reviews || []).length, 'reviews');

    const reviews = detailsData.reviews || [];
    
    const transformedReviews = reviews.map((review, index) => {
      return {
        id: index + 1,
        name: (review.authorAttribution && review.authorAttribution.displayName) || 'Anonymous',
        location: 'Via Google',
        rating: review.rating || 5,
        text: (review.text && review.text.text) || 'Great service!',
        image: (review.authorAttribution && review.authorAttribution.photoUri) || 'https://images.pexels.com/photos/' + (1239291 + index) + '/pexels-photo-' + (1239291 + index) + '.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
    });

    const goodReviews = transformedReviews
      .filter(function(review) { return review.rating >= 4; })
      .slice(0, 5);

    console.log('Sending', goodReviews.length, 'good reviews to website');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reviews: goodReviews,
        count: goodReviews.length,
        businessInfo: {
          name: detailsData.displayName,
          rating: detailsData.rating,
          totalReviews: detailsData.userRatingCount,
          placeId: placeId
        }
      }),
    };

  } catch (error) {
    console.error('Something broke:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to get reviews',
        fallback: true,
        message: error.message || 'Unknown error'
      }),
    };
  }
};
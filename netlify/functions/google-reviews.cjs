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

  // Fallback reviews (your beautiful default ones)
  const fallbackReviews = [
    {
      id: 1,
      name: 'Sarah M.',
      location: 'Houston, TX',
      rating: 5,
      text: 'Decora is amazing! The van showed up right on time and the experience was so luxurious. My lashes look incredible and lasted for weeks. Will definitely book again!',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      name: 'Jessica L.',
      location: 'Katy, TX',
      rating: 5,
      text: 'I love the convenience! No more driving across town for lash appointments. The van is beautiful inside and Decora is so professional. Best lashes I\'ve ever had!',
      image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      name: 'Amanda R.',
      location: 'Sugar Land, TX',
      rating: 5,
      text: 'The hybrid lashes are perfect! Decora listened to exactly what I wanted and delivered beyond my expectations. The mobile concept is genius - so convenient for busy moms!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 4,
      name: 'Maria G.',
      location: 'Pearland, TX',
      rating: 5,
      text: 'Absolutely love my volume lashes! Decora is so talented and the van experience feels like a high-end spa. Perfect for special events or just treating yourself!',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 5,
      name: 'Rachel K.',
      location: 'The Woodlands, TX',
      rating: 5,
      text: 'Best decision ever! The classic lashes give me the perfect natural look I wanted. Decora is so sweet and professional. The van is gorgeous inside!',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const GOOGLE_LOCATION_ID = process.env.GOOGLE_LOCATION_ID;

    // If no API setup, just return fallback
    if (!GOOGLE_API_KEY || !GOOGLE_LOCATION_ID) {
      console.log('No API configuration, using fallback reviews');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          reviews: fallbackReviews,
          count: fallbackReviews.length,
          source: 'fallback'
        }),
      };
    }

    console.log('Trying Google API for Place ID:', GOOGLE_LOCATION_ID);

    // Try Google Places API
    const url = 'https://places.googleapis.com/v1/places/' + GOOGLE_LOCATION_ID;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'reviews,displayName,rating,userRatingCount'
      }
    });

    console.log('Google API response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      const reviews = data.reviews || [];
      
      if (reviews.length > 0) {
        console.log('SUCCESS! Got', reviews.length, 'reviews from Google');
        
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

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            reviews: goodReviews,
            count: goodReviews.length,
            source: 'google',
            businessInfo: {
              name: data.displayName,
              rating: data.rating,
              totalReviews: data.userRatingCount
            }
          }),
        };
      }
    }

    // If API fails, use fallback
    console.log('Google API failed or no reviews, using fallback');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reviews: fallbackReviews,
        count: fallbackReviews.length,
        source: 'fallback'
      }),
    };

  } catch (error) {
    console.error('Error calling Google API:', error);
    
    // Always return fallback on error
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reviews: fallbackReviews,
        count: fallbackReviews.length,
        source: 'fallback'
      }),
    };
  }
};
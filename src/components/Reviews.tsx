import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Loader2 } from 'lucide-react';
import { Review, GoogleReviewsResponse } from '../types';

const Reviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Generate consistent color for each person based on their name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-teal-400 to-teal-600',
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get first letter of name
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Handle image error
  const handleImageError = (reviewId: number) => {
    setImageErrors(prev => ({ ...prev, [reviewId]: true }));
  };

  // Avatar component that shows image or fallback
  const Avatar = ({ review, size = 'large' }: { review: Review; size?: 'small' | 'large' }) => {
    const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-10 h-10';
    const textSizeClasses = size === 'large' ? 'text-xl' : 'text-sm';
    const borderClasses = size === 'large' ? 'border-4 border-white shadow-lg' : '';
    
    if (review.image && !imageErrors[review.id]) {
      return (
        <img
          src={review.image}
          alt={review.name}
          className={`${sizeClasses} rounded-full object-cover ${borderClasses}`}
          onError={() => handleImageError(review.id)}
        />
      );
    }
    
    return (
      <div 
        className={`${sizeClasses} rounded-full ${getAvatarColor(review.name)} flex items-center justify-center ${borderClasses}`}
      >
        <span className={`${textSizeClasses} font-semibold text-white`}>
          {getInitials(review.name)}
        </span>
      </div>
    );
  };

  // Fallback static reviews (remove image URLs to test fallback)
  const fallbackReviews: Review[] = [
    {
      id: 1,
      name: 'Danika Ramirez',
      location: 'Houston, TX',
      rating: 5,
      text: 'I had an amazing experience! It was my first time trying a mobile lash salon, and the convenience was incredible - no lengthy travel needed! Plus, I\'m absolutely loving my lashes!',
      image: '', // Removed to show fallback
    },
    {
      id: 2,
      name: 'MrsA',
      location: 'Houston TX',
      rating: 5,
      text: 'Lashes to Go was a lifesaver! I was working on a hospital implementation in Houston and couldn’t find time to visit a local lash salon. Then I found Lashes to Go Mobile! I highly recommend her services. Her mobile setup is clean, sanitary, comfortable, and very professional!',
      image: '', // Removed to show fallback
    },
    {
      id: 3,
      name: 'Clarissa Minero',
      location: 'Houston, TX',
      rating: 5,
      text: 'I loved this mobile lash, so convenient and it does not even feel you are in a vehicle. Decora was so sweet and walking me through the process , making sure I was comfortable and doing okay. She made sure I was happy with my lashes and I definitely was. So glad I found this!',
      image: '',
    },
    {
      id: 4,
      name: 'DeAndrea Barras',
      location: 'Houston, TX',
      rating: 5,
      text: 'This was my first time ever getting my lashes done, let alone in a mobile setting. I was nervous about it and it was spur of the moment because she was near my home & was in the middle of another appointment. I wasn’t even looking to get my lashes done, I was just being nosey lol, & even at the end of Decora’s day she was still extremely courteous & informative. She was also very accommodating during my lash appointment. Her mobile lash shop was really clean & comfortable. She was very gentle & eased all my worries. My lashes are still going strong & I made sure my next appointment was booked before I left. I’m sold!',
      image: '', // Removed to show fallback
    },
    {
      id: 5,
      name: 'Danielle Head',
      location: 'Houston, TX',
      rating: 5,
      text: 'Lashes To-go and More was an amazing experience! She was punctual, offered great customer service, and was knowledgeable about her craft! As you walked into the mobile facility, it was clean and welcoming. I felt like I was inside of a lash spa. The lash technician was very personable and asked questions about my lash journey, in addition to thoroughly explaining the difference between the type of lash services they offered. I felt very comfortable with my lashes in her hands lol. I highly recommend Lashes To-go. I give it a 10 out it 10, and I am looking forward to my fill-in!',
      image: '',
    },
  ];

  // Fetch Google reviews on component mount
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch('/.netlify/functions/google-reviews');
        const data: GoogleReviewsResponse = await response.json();
        
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          // Use fallback reviews if API returns no reviews
          setReviews(fallbackReviews);
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews(fallbackReviews);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-deep-brown mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-charcoal-grey max-w-3xl mx-auto font-light">
            Real reviews from real clients who love their Lashes To-Go experience
          </p>
          {error && (
            <p className="text-sm text-primary-orange mt-2 opacity-75">
              Displaying featured reviews
            </p>
          )}
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-primary-orange animate-spin mx-auto mb-4" />
              <p className="text-charcoal-grey font-light">Loading reviews...</p>
            </div>
          </motion.div>
        ) : (
        <div className="max-w-4xl mx-auto">
          {/* Main Review Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-12"
          >
            <div className="bg-cream rounded-3xl p-8 md:p-12 shadow-elegant relative overflow-hidden">
              {/* Background Quote Icon */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-primary-orange/20" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-primary-orange fill-current"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xl md:text-2xl text-charcoal-grey font-light italic mb-8 leading-relaxed">
                    "{reviews[currentReview].text}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar review={reviews[currentReview]} size="large" />
                    <div className="text-left">
                      <h4 className="font-medium text-deep-brown text-lg">
                        {reviews[currentReview].name}
                      </h4>
                      <p className="text-charcoal-grey opacity-70">
                        {reviews[currentReview].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Review Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center space-x-4 mb-12"
          >
            <button
              onClick={prevReview}
              className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-300"
            >
              ←
            </button>
            
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReview ? 'bg-primary-orange' : 'bg-primary-orange/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextReview}
              className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-300"
            >
              →
            </button>
          </motion.div>

          {/* All Reviews Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {reviews.slice(0, 3).map((review, _index) => (
              <motion.div
                key={review.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-elegant border border-neutral-200"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary-orange fill-current"
                    />
                  ))}
                </div>
                <p className="text-charcoal-grey text-sm mb-4 italic">
                  "{review.text.slice(0, 100)}..."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar review={review} size="small" />
                  <div>
                    <h5 className="font-medium text-deep-brown text-sm">
                      {review.name}
                    </h5>
                    <p className="text-charcoal-grey text-xs opacity-70">
                      {review.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Google Reviews Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href="https://www.google.com/maps/place/Lashes+To-go+and+More/@29.8072969,-95.7950158,10z/data=!4m18!1m9!3m8!1s0xa21ef2bf0397ed07:0xb227652f511965d4!2sLashes+To-go+and+More!8m2!3d29.80711!4d-95.465351!9m1!1b1!16s%2Fg%2F11kjq5fmzc!3m7!1s0xa21ef2bf0397ed07:0xb227652f511965d4!8m2!3d29.80711!4d-95.465351!9m1!1b1!16s%2Fg%2F11kjq5fmzc?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-orange hover:text-light-orange transition-colors duration-300 font-medium"
            >
              <span>Read more reviews on Google</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </a>
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
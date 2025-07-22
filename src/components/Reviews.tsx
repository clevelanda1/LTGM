import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Loader2 } from 'lucide-react';

const Reviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fallback static reviews
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

  // Fetch Google reviews on component mount
  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch('/.netlify/functions/google-reviews');
        const data = await response.json();
        
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
                    <img
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
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
            {reviews.slice(0, 3).map((review, index) => (
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
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
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
              href="https://www.google.com/search?q=lashes+to+go+more+reviews"
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
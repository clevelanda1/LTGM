import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Car, Home } from 'lucide-react';

// Import your local images
import decoraVanImage from '../images/decora-van.png';
import insideVanImage from '../images/inside-van.png';
import outsideVanImage from '../images/outside-van.png';

const VanExperience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentImage, setCurrentImage] = useState(0);

  // Updated vanImages array with your local images
  const vanImages = [
    {
      id: 1,
      title: 'Outside the Salon',
      description: 'Beautiful exterior design of our mobile salon',
      url: outsideVanImage,
    },
    {
      id: 2,
      title: 'Celebrate With Me',
      description: 'Introducing Lashes To-go & More',
      url: decoraVanImage,
    },
    {
      id: 3,
      title: 'Inside the Salon',
      description: 'Luxurious interior with professional equipment',
      url: insideVanImage,
    },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % vanImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + vanImages.length) % vanImages.length);
  };

  return (
    <section id="van" className="py-20 bg-warm-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-deep-brown mb-6">
            The Mobile Experience
          </h2>
          <p className="text-xl text-charcoal-grey max-w-3xl mx-auto mb-4 font-light">
            Step inside our fully equipped mobile salon and experience convience at your doorstep
          </p>
          <p className="text-2xl font-light text-primary-orange italic">
            "Guess What? We're Coming!"
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-rose">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={vanImages[currentImage].url}
                    alt={vanImages[currentImage].title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {vanImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Current Image Info */}
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-center"
              >
                <h3 className="text-xl font-semibold text-charcoal mb-2">
                  {vanImages[currentImage].title}
                </h3>
                <p className="text-charcoal-grey opacity-80">
                  {vanImages[currentImage].description}
                </p>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-deep-brown">
                    Mobile Luxury
                  </h3>
                </div>
                <ul className="space-y-3 text-charcoal-grey">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Fully equipped professional salon on wheels</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Climate-controlled comfort year-round</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Premium sound system for relaxation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Sanitized and pristine environment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cream rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium text-deep-brown">
                    Your Convenience
                  </h3>
                </div>
                <ul className="space-y-3 text-charcoal-grey">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>No driving to appointments</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>No waiting rooms or delays</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Schedule around your busy life</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
                    <span>Privacy and personalized attention</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                {/*<motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('booking');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="gradient-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-elegant hover:shadow-elegant-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  {/*<Sparkles size={20} />
                  <span>Experience the Van</span>
                </motion.button>*/}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VanExperience;
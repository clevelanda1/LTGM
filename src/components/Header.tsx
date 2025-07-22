import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navigateToBooking = () => {
    window.open('https://LashesTo-Go.as.me/', '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Shimmer CSS */}
      <style>{`
        .shimmer-text {
          position: relative;
          color: #B45309; /* Always visible lighter orange */
        }

        .shimmer-text::after {
          content: 'LTGM';
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 30%,
            #F97316 40%,
            #FBBF24 50%,
            #F97316 60%,
            transparent 70%,
            transparent 100%
          );
          background-size: 300% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 7.5s linear infinite;
        }

        .shimmer-button-text {
          position: relative;
          color: rgba(255, 255, 255, 0.6); /* More transparent base for stronger contrast */
        }

        .shimmer-button-text::after {
          content: 'Book Now';
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 15%,
            rgba(255, 255, 255, 0.4) 20%,
            rgba(255, 255, 255, 0.7) 25%,
            rgba(255, 255, 255, 0.9) 30%,
            #FFFFFF 35%,
            #FFF7ED 40%,
            #FFFFFF 45%,
            #FFF7ED 50%,
            #FFFFFF 55%,
            #FFF7ED 60%,
            #FFFFFF 65%,
            rgba(255, 255, 255, 0.9) 70%,
            rgba(255, 255, 255, 0.7) 75%,
            rgba(255, 255, 255, 0.4) 80%,
            transparent 85%,
            transparent 100%
          );
          background-size: 150% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerSuperShiny 2s linear infinite;
          filter: brightness(1.4) contrast(1.2);
        }

        @keyframes shimmer {
          0% {
            background-position: -300% 0;
          }
          100% {
            background-position: 300% 0;
          }
        }

        @keyframes shimmerSuperShiny {
          0% {
            background-position: -150% 0;
            filter: brightness(1.6) contrast(1.3);
          }
          100% {
            background-position: 150% 0;
            filter: brightness(1.6) contrast(1.3);
          }
        }

        /* Remove button glow effects */
        .shimmer-button {
          position: relative;
        }

        /* Fallback for browsers that don't support background-clip: text */
        @supports not (-webkit-background-clip: text) {
          .shimmer-text {
            background: #D97706;
            -webkit-text-fill-color: initial;
            color: #D97706;
          }
          .shimmer-button-text {
            color: #FFFFFF;
          }
        }
      `}</style>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/98 backdrop-blur-md shadow-elegant' : 'bg-transparent'
        }`}
      >
        <nav className="container-narrow py-6">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-light tracking-wide shimmer-text"
            >
              LTGM
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <button
                onClick={() => scrollToSection('about')}
                className="text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('van')}
                className="text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Reviews
              </button>
              <motion.button
                onClick={navigateToBooking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-primary-orange text-white px-6 py-3 rounded-full font-medium hover:bg-light-orange transition-colors duration-300 shadow-elegant shimmer-button relative"
              >
                <Calendar size={16} />
                <span className="shimmer-button-text relative z-10">Book Now</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-charcoal-grey"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-6 bg-white rounded-2xl shadow-elegant-lg p-6 border border-neutral-200"
            >
              <div className="flex flex-col space-y-6">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('van')}
                  className="text-left text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="text-left text-charcoal-grey hover:text-primary-orange transition-colors duration-300 font-light"
                >
                  Reviews
                </button>
                <button
                  onClick={navigateToBooking}
                  className="flex items-center space-x-2 bg-primary-orange text-white px-6 py-3 rounded-full font-medium text-center justify-center shadow-elegant shimmer-button relative"
                >
                  <Calendar size={16} />
                  <span className="shimmer-button-text relative z-10">Book Now</span>
                </button>
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>
    </>
  );
};

export default Header;
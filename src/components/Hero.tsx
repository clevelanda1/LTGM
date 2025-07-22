import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95"></div>
      
      {/* Background Pattern from Services component */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            #fff 2px,
            #fff 4px
          )`
        }} />
      </div>
      
      {/* Subtle Pattern Background (keeping your original pattern as well) */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.2) 1px, transparent 1px),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.25) 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.3) 2px, transparent 2px),
            radial-gradient(circle at 10% 90%, rgba(255,255,255,0.2) 1px, transparent 1px),
            radial-gradient(circle at 60% 15%, rgba(255,255,255,0.15) 1px, transparent 1px),
            radial-gradient(circle at 25% 85%, rgba(255,255,255,0.25) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 320px 320px, 200px 200px'
        }}>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-20 sm:mt-0 mb-16 sm:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1
            className="text-5xl md:text-5xl lg:text-6xl font-light text-white mb-8 text-shadow tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Lashes So Neat. Beauty Complete
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-white/95 mb-6 font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Salon Luxury. Mobile Convenience.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Professional eyelash extensions delivered directly to your location in our fully equipped mobile salon
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            onClick={scrollToServices}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-deep-brown px-10 py-4 rounded-full font-medium text-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 border border-white/20"
          >
            <Calendar size={20} />
            <span>Get More Information</span>
          </motion.button>
          <motion.a
            href="tel:3467669245"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/80 text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-deep-brown transition-all duration-300"
          >
            Call (346) 766-9245
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap justify-center gap-12 text-white/90"
        >
          <div className="flex items-center space-x-3">
            <GraduationCap size={20} className="text-white" />
            <span className="font-light">Licensed Professional</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-white" />
            <span className="font-light">Houston & Surrounding Areas</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar size={20} className="text-white" />
            <span className="font-light">Same-Day Appointments</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator 
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5"></div>
        </div>
      </motion.div>*/}
    </section>
  );
};

export default Hero;
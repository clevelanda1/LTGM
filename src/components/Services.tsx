import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      id: 1,
      name: 'Classic To-Go',
      description: 'Perfect for those who want a casual, everyday look with natural enhancement',
      duration: '90-120 minutes',
      price: '$155',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&auto=format',
      alt: 'Classic Lashes Example',
      features: ['Natural Enhancement', 'Everyday Casual Look', 'Perfect for Beginners'],
      note: 'Not suitable if you have gaps or sparse lashes',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Full%2520Sets%2520To-Go!/appointment/60346960/calendar/4256055'
    },
    {
      id: 2,
      name: 'Wet Set To-Go',
      description: 'Wet-look lashes that give a darker, denser appearance similar to classic style',
      duration: '120-150 minutes',
      price: '$155',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop&auto=format',
      alt: 'Wet Set Lashes Example',
      features: ['Wet-Look Effect', 'Darker & Denser', 'Similar to Classic'],
      note: 'Not suitable if you have gaps or sparse lashes',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Full%2520Sets%2520To-Go!/appointment/15820017/calendar/4256055'
    },
    {
      id: 3,
      name: 'Hybrid To-Go',
      description: 'Most popular! Full set combining classic and volume for fabulous fullness and texture',
      duration: '120-150 minutes',
      price: '$155',
      image: 'https://images.unsplash.com/photo-1583001931096-959e8b6c3d66?w=400&h=400&fit=crop&auto=format',
      alt: 'Hybrid Lashes Example',
      features: ['Most Popular Choice', 'Natural "Pop" Effect', 'Best of Both Worlds'],
      note: 'Strategic combination of classic and volume techniques',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Full%2520Sets%2520To-Go!/appointment/16489095/calendar/4256055',
      isPopular: true
    },
    {
      id: 4,
      name: 'Volume To-Go',
      description: 'Full set of mink extensions providing maximum fullness throughout the entire lash line',
      duration: '150-180 minutes',
      price: '$155',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format',
      alt: 'Volume Lashes Example',
      features: ['Maximum Fullness', '3-8 Handmade Fans', 'Perfect for Sparse Lashes'],
      note: 'Ideal for individuals with sparse or gaps in natural lashes',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Full%2520Sets%2520To-Go!/appointment/16489436/calendar/4256055'
    },
    {
      id: 5,
      name: 'Cluster Lashes',
      description: 'Quick and efficient cluster application underneath natural lashes for special occasions',
      duration: '60-90 minutes',
      price: '$68',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format',
      alt: 'Cluster Lashes Example',
      features: ['Quick Application', 'Special Occasions', 'Sensitive Eye Friendly'],
      note: 'Lasts up to 10 days - perfect for events',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Cluster%2520Lashes/appointment/60237332/calendar/4256055'
    },
    {
      id: 6,
      name: 'Refills To-Go',
      description: 'Maintain your beautiful lashes with professional refill services',
      duration: '60-120 minutes',
      price: '$60-120',
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop&auto=format',
      alt: 'Lash Refill Service',
      features: ['1 Week Refill - $60', '2-3 Week Refill - $120', '45% Lashes Required'],
      note: 'Must have 45% of lashes remaining. Less than 45% will be charged accordingly',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Refill%2520Appointments'
    },
    {
      id: 7,
      name: 'Removal Service',
      description: 'Professional and safe removal of existing lash extensions',
      duration: '30-45 minutes',
      price: '$55',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop&auto=format',
      alt: 'Lash Removal Service',
      features: ['Safe Removal Process', 'Professional Grade Products', 'Eye Health Priority'],
      note: 'Gentle removal to protect your natural lashes',
      bookingUrl: 'https://lashesto-go.as.me/schedule/3423c0be/category/Misc/appointment/51848769/calendar/4256055'
    }
  ];

  const navigateToBooking = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="services" className="section-padding-lg bg-warm-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            #000 2px,
            #000 4px
          )`
        }} />
      </div>

      <div className="container-narrow relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-deep-brown mb-8 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-charcoal-grey max-w-4xl mx-auto font-light leading-relaxed">
            Professional eyelash extension services meticulously tailored to your unique style and lifestyle
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-6 pt-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-8 min-w-max px-4 py-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-3xl p-8 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 w-80 flex-shrink-0 relative ${
                  service.isPopular 
                    ? 'border-2 border-primary-orange ring-2 ring-primary-orange/20' 
                    : 'border border-neutral-300'
                }`}
              >
                {/* Popular Tag */}
                {service.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-orange text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg -mt-2">
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-deep-brown mb-3 tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-charcoal-grey mb-4 font-light leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-charcoal-grey mb-6">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span className="font-light">{service.duration}</span>
                    </div>
                    <div className="font-medium text-primary-orange text-lg">
                      {service.price}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-primary-orange rounded-full flex-shrink-0"></div>
                      <span className="text-charcoal-grey text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.note && (
                  <div className="mb-6 p-3 bg-cream rounded-xl border border-neutral-200">
                    <p className="text-xs text-charcoal-grey font-light italic">
                      Note: {service.note}
                    </p>
                  </div>
                )}

                <motion.button
                  onClick={() => navigateToBooking(service.bookingUrl)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gradient-primary text-white py-3 rounded-full font-medium hover:opacity-90 transition-opacity duration-300 text-base"
                >
                  Book {service.name}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 mb-12">
          <div className="flex items-center space-x-2 text-charcoal-grey">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
              <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
              <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
            </div>
            <span className="text-sm font-light ml-3">Scroll to see all services →</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-12 max-w-5xl mx-auto shadow-elegant border border-neutral-300">
            <h3 className="text-3xl font-light text-neutral-800 mb-8 tracking-tight">
              New Client Specials
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-orange to-light-orange rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h4 className="font-medium text-white mb-3 text-2xl">Full Set Extensions</h4>
                  <div className="text-4xl font-light mb-4">$140</div>
                  <p className="text-white/90 font-light leading-relaxed">
                    Complete full set of premium lash extensions for first-time clients
                  </p>
                  <div className="mt-6 bg-white/20 rounded-xl p-4">
                    <p className="text-sm font-medium">NEW CLIENT SPECIAL</p>
                    <p className="text-xs text-white/80 mt-1">Save $15 off regular pricing</p>
                  </div>
                  <motion.button
                    onClick={() => navigateToBooking('https://lashesto-go.as.me/schedule/3423c0be/category/NEW%2520CLIENT%2520SPECIALS/appointment/72799649/calendar/4256055')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-white text-primary-orange py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors duration-300"
                  >
                    Book Today
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-charcoal-grey to-deep-brown rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h4 className="font-medium text-white mb-3 text-2xl">Cluster/DIY Application</h4>
                  <div className="text-4xl font-light mb-4">$60</div>
                  <p className="text-white/90 font-light leading-relaxed">
                    Quick cluster lash application perfect for events and special occasions
                  </p>
                  <div className="mt-6 bg-white/20 rounded-xl p-4">
                    <p className="text-sm font-medium">NEW CLIENT SPECIAL</p>
                    <p className="text-xs text-white/80 mt-1">Save $8 off regular pricing</p>
                  </div>
                  <motion.button
                    onClick={() => navigateToBooking('https://lashesto-go.as.me/schedule/3423c0be/category/NEW%2520CLIENT%2520SPECIALS/appointment/72799869/calendar/4256055')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-white text-charcoal-grey py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors duration-300"
                  >
                    Book Today
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
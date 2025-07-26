import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, MapPin, Phone, Gift } from 'lucide-react';

const Booking = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigateToFullSetGiftCard = () => {
    window.open('https://app.acuityscheduling.com/catalog.php?owner=20233174&action=addCart&clear=1&id=2017158', '_blank');
  };

  const navigateToClusterGiftCard = () => {
    window.open('https://app.acuityscheduling.com/catalog.php?owner=20233174&action=addCart&clear=1&id=2017161', '_blank');
  };

  return (
    <section id="booking" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-deep-brown mb-6">
            Book Your Appointment
          </h2>
          <p className="text-xl text-charcoal-grey max-w-3xl mx-auto font-light">
            Schedule your mobile lash appointment and experience LTGM at your doorstep
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Booking Form/Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Acuity Scheduling Embed Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant">
                <h3 className="text-2xl font-medium text-deep-brown mb-6 text-center">
                  Schedule Online
                </h3>
                <div className="bg-cream rounded-xl p-8 text-center">
                  <Calendar className="w-16 h-16 text-primary-orange mx-auto mb-4" />
                  <p className="text-charcoal-grey mb-6">
                    Click below to open our real-time booking system powered by Acuity Scheduling
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open('https://lashesto-go.as.me/schedule/3423c0be', '_blank');
                    }}
                    className="gradient-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
                  >
                    Book Now - Acuity Scheduling
                  </motion.button>
                  <p className="text-sm text-charcoal-grey mt-4 opacity-70">
                    See real-time availability and book instantly
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-medium text-deep-brown mb-6 text-center">
                  Prefer to Call?
                </h3>
                <motion.a
                  href="tel:3467669245"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-3 bg-primary-orange text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-light-orange transition-colors duration-300"
                >
                  <Phone size={20} />
                  <span>(346) 766-9245</span>
                </motion.a>
                <p className="text-center text-charcoal-grey mt-4 opacity-70">
                  Call for same-day appointments or special requests
                </p>
              </div>

              {/* Gift Cards */}
              <div className="bg-gradient-to-br from-charcoal-grey to-deep-brown rounded-2xl p-8 text-white">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {/*<Gift className="w-8 h-8" />*/}
                  <h3 className="text-2xl font-medium">Gift Cards Available</h3>
                </div>
                <p className="mb-8 opacity-90 text-center">
                  Give the gift of luxury lashes! Perfect for birthdays, holidays, or any special occasion.
                </p>
                
                {/* Gift Card Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Set Gift Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-orange to-light-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Full Set Experience</h4>
                    <p className="text-sm opacity-80 mb-4">Complete lash extension experience with professional application</p>
                    <motion.button
                      onClick={navigateToFullSetGiftCard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-primary-orange py-2 px-4 rounded-full font-medium hover:bg-warm-white transition-colors duration-300"
                    >
                      Purchase 
                    </motion.button>
                  </motion.div>

                  {/* Cluster Gift Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-light-orange to-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Cluster Experience</h4>
                    <p className="text-sm opacity-80 mb-4">Beautiful cluster lashes perfect for events and special occasions</p>
                    <motion.button
                      onClick={navigateToClusterGiftCard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-primary-orange py-2 px-4 rounded-full font-medium hover:bg-warm-white transition-colors duration-300"
                    >
                      Purchase
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Booking Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Service Areas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <MapPin className="w-8 h-8 text-primary-orange" />
                  <h3 className="text-2xl font-medium text-deep-brown">Service Areas</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-charcoal-grey">Houston</span>
                    <span className="text-primary-orange font-medium">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-charcoal-grey">Katy</span>
                    <span className="text-primary-orange font-medium">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-charcoal-grey">Sugar Land</span>
                    <span className="text-primary-orange font-medium">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-charcoal-grey">Pearland</span>
                    <span className="text-primary-orange font-medium">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-charcoal-grey">The Woodlands</span>
                    <span className="text-primary-orange font-medium">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-charcoal-grey">Other areas</span>
                    <span className="text-charcoal-grey text-sm opacity-70">Contact us</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-cream rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="w-8 h-8 text-primary-orange" />
                  <h3 className="text-2xl font-medium text-deep-brown">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-grey">Monday - Friday</span>
                    <span className="text-charcoal-grey font-medium">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-grey">Saturday</span>
                    <span className="text-charcoal-grey font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-grey">Sunday</span>
                    <span className="text-charcoal-grey font-medium">Contact Us</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-xl">
                  <p className="text-sm text-charcoal-grey opacity-80">
                    <strong>Same-day appointments:</strong> Available based on schedule. Call for urgent bookings.
                  </p>
                </div>
              </div>

              {/* Booking Requirements */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-medium text-deep-brown mb-6">Before Your Appointment</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>Text your address</strong> - Send location to (346)766-9245. Ensure parking for our mobile van
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>Non-refundable deposit</strong> - Required to secure appointment, applied to service
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>Remove all eye makeup</strong> - Come with clean lashes for best results
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>Cashless payments</strong> - All major credit cards accepted including Zelle and Paypal
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>24-hour cancellation</strong> - Required for all bookings
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <p className="text-charcoal-grey">
                      <strong>Full sets required</strong> - After two refills. No refunds policy applies
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How long do eyelash extensions last?',
      answer: 'Eyelash extensions typically last 2-3 weeks with proper care. We recommend fills every 2-3 weeks to maintain fullness as your natural lashes shed.',
    },
    {
      id: 2,
      question: 'Is the mobile service really in a van?',
      answer: 'Yes! Our fully equipped van features reclining chairs, pink cabinets, rattan finishes, climate control, and all professional tools. It\'s like having a luxury salon come to your driveway.',
    },
    {
      id: 3,
      question: 'How long does an appointment take?',
      answer: 'Classic lashes take 90-120 minutes, Hybrid lashes take 120-150 minutes, and Volume lashes take 150-180 minutes. This includes consultation and aftercare instructions.',
    },
    {
      id: 4,
      question: 'What areas do you service?',
      answer: 'We service Houston and surrounding areas including Katy, Sugar Land, Pearland, The Woodlands, and more. Contact us if you\'re unsure about your location!',
    },
    {
      id: 5,
      question: 'Can I get lash extensions if I have sensitive eyes?',
      answer: 'Yes! We use high-quality, hypoallergenic adhesives and can customize the service for sensitive clients. Please mention any sensitivities when booking.',
    },
    {
      id: 6,
      question: 'What should I do to prepare for my appointment?',
      answer: 'Come with clean lashes (no makeup), avoid caffeine beforehand, and ensure your driveway is accessible for our van. We\'ll handle the rest!',
    },
    {
      id: 7,
      question: 'Do you offer same-day appointments?',
      answer: 'We do our best to accommodate same-day requests based on availability. Call us at (346) 766-9245 for urgent bookings.',
    },
    {
      id: 8,
      question: 'What\'s your cancellation policy?',
      answer: 'We require 24-hour notice for cancellations. Same-day cancellations may incur a fee. We understand life happens, so please communicate with us!',
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-deep-brown mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-charcoal-grey max-w-3xl mx-auto font-light">
            Everything you need to know about our mobile lash services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-elegant border border-neutral-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-cream transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-deep-brown pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === faq.id ? (
                      <Minus className="w-6 h-6 text-primary-orange" />
                    ) : (
                      <Plus className="w-6 h-6 text-primary-orange" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-charcoal-grey leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-medium mb-4">Still Have Questions?</h3>
              <p className="mb-6 opacity-90">
                We're here to help! Reach out and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:3467669245"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-orange px-6 py-3 rounded-full font-medium hover:bg-warm-white transition-colors duration-300"
                >
                  Call (346) 766-9245
                </motion.a>
                <motion.a
                  href="mailto:info@lashestogohtx.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-primary-orange transition-all duration-300"
                >
                  Send Email
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
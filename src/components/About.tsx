import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Star, Award, Shield } from 'lucide-react';

// Import the image
import decoraImage from '../images/decora.png';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-light text-deep-brown mb-8 tracking-tight"
            >
              Meet <span className="gradient-text font-medium">Decora</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-charcoal-grey max-w-4xl mx-auto font-light leading-relaxed"
            >
              Licensed lash artist with an MBA and corporate background bringing professionalism, 
              warmth, and a high-touch approach to the lash industry.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            {/* Professional Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-square bg-cream rounded-3xl p-8 shadow-elegant-lg border border-neutral-100">
                <div className="w-full h-full bg-neutral-100 rounded-2xl overflow-hidden">
                  <img 
                    src={decoraImage} 
                    alt="Decora - Professional Lash Artist" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-12"
            >
              {/* Quote */}
              <div className="bg-white rounded-3xl p-12 shadow-elegant border border-neutral-100">
                <blockquote className="text-5xl font-light text-deep-brown mb-8 leading-normal">
                  "Why sit in traffic when you can sit pretty."
                </blockquote>
                <cite className="text-primary-orange font-medium text-lg">- Decora, Founder & Lead Lash Artist</cite>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-light text-primary-orange mb-2">200+</div>
                  <div className="text-charcoal-grey font-light">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-primary-orange mb-2">3+</div>
                  <div className="text-charcoal-grey font-light">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Credentials Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div className="bg-white rounded-2xl p-8 text-center shadow-elegant border border-neutral-100 hover:shadow-elegant-lg transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-primary-orange mx-auto mb-6" />
              <h4 className="font-medium text-deep-brown mb-4 text-lg">Licensed Professional</h4>
              <p className="text-sm text-charcoal-grey font-light leading-relaxed">
                Certified lash artist with ongoing education and industry certifications
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-elegant border border-neutral-100 hover:shadow-elegant-lg transition-all duration-300">
              <Award className="w-12 h-12 text-primary-orange mx-auto mb-6" />
              <h4 className="font-medium text-deep-brown mb-4 text-lg">MBA Background</h4>
              <p className="text-sm text-charcoal-grey font-light leading-relaxed">
                Business expertise meets beauty artistry for exceptional service delivery
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-elegant border border-neutral-100 hover:shadow-elegant-lg transition-all duration-300">
              <Shield className="w-12 h-12 text-primary-orange mx-auto mb-6" />
              <h4 className="font-medium text-deep-brown mb-4 text-lg">Health & Safety Certified </h4>
              <p className="text-sm text-charcoal-grey font-light leading-relaxed">
                Certified in health protocols and safety standards for your protection
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-elegant border border-neutral-100 hover:shadow-elegant-lg transition-all duration-300">
              <Star className="w-12 h-12 text-primary-orange mx-auto mb-6" />
              <h4 className="font-medium text-deep-brown mb-4 text-lg">5-Star Service</h4>
              <p className="text-sm text-charcoal-grey font-light leading-relaxed">
                Consistently exceptional results with personalized attention to detail
              </p>
            </div>
          </motion.div>

          {/* Professional Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 text-center"
          >
            <div className="max-w-4xl mx-auto bg-cream rounded-3xl p-12 border border-neutral-100">
              <h3 className="text-2xl font-light text-deep-brown mb-6">Our Professional Commitment</h3>
              <p className="text-lg text-charcoal-grey font-light leading-relaxed">
                We combine corporate-level professionalism with personalized beauty services, 
                delivering consistent, high-quality results that fit seamlessly into your busy lifestyle. 
                Every appointment reflects our commitment to excellence, safety, and client satisfaction.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-deep-brown text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-light text-primary-orange mb-4"
            >
              Lashes To-Go & More
            </motion.h3>
            <p className="text-white/80 mb-6 max-w-md">
              Professional mobile eyelash extension services bringing salon luxury directly to your doorstep. Licensed, insured, and passionate about making you feel beautiful.
            </p>
            <p className="text-primary-orange italic font-light">
              "Servicing Houston and surrounding areas"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-medium mb-6 text-primary-orange">Quick Links</h4>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection('about')}
                className="block text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                About Decora
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Our Services
              </button>
              <button
                onClick={() => scrollToSection('van')}
                className="block text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                The Van Experience
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="block text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Client Reviews
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="block text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-medium mb-6 text-primary-orange">Get In Touch</h4>
            <div className="space-y-4">
              <motion.a
                href="tel:3467669245"
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                <Phone size={18} />
                <span>(346) 766-9245</span>
              </motion.a>
              <motion.a
                href="mailto:hello@lashestogo.com"
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-white/80 hover:text-primary-orange transition-colors duration-300 font-light"
              >
                <Mail size={18} />
                <span>info@lashestogohtx.com</span>
              </motion.a>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-white/80 font-light"
              >
                <MapPin size={18} />
                <span>Houston, TX & Surrounding Areas</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="text-lg font-medium mb-4 text-primary-orange">Follow Us</h5>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.instagram.com/lashes_togo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center hover:bg-light-orange transition-colors duration-300"
                >
                  <Instagram size={20} />
                </motion.a>
                {/*<motion.a
                  href="https://facebook.com/lashestogo"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center hover:bg-light-orange transition-colors duration-300"
                >
                  <Facebook size={20} />
  </motion.a>*/}
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <h4 className="text-lg font-medium mb-4 text-center text-primary-orange">Service Areas</h4>
          <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm font-light">
            <span>Houston</span>
            <span>•</span>
            <span>Katy</span>
            <span>•</span>
            <span>Sugar Land</span>
            <span>•</span>
            <span>Pearland</span>
            <span>•</span>
            <span>The Woodlands</span>
            <span>•</span>
            <span>Cypress</span>
            <span>•</span>
            <span>Spring</span>
            <span>•</span>
            <span>Tomball</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0 font-light">
            © 2024 Lashes To-Go & More. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-white/60 text-sm font-light">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>for beautiful lashes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
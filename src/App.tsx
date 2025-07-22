import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VanExperience from './components/VanExperience';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-soft-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <VanExperience />
        <Reviews />
        <Booking />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
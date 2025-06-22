import React from 'react';
import Navigation from './Navigation';
import HeroCarousel from './HeroCarousel';
import DestinationCards from './DestinationCards';
import TourPackages from './TourPackages';
import ChatBar from './ChatBar';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <HeroCarousel />
        </section>
        <DestinationCards />
        <TourPackages />
      </main>
      <Footer />
      <ChatBar />
    </div>
  );
};

export default AppLayout;
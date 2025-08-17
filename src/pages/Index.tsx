
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CricketSection from '@/components/CricketSection';
import GamesSection from '@/components/GamesSection';
import Leaderboard from '@/components/Leaderboard';
import RewardsSection from '@/components/RewardsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CricketSection />
        <GamesSection />
        <Leaderboard />
        <RewardsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

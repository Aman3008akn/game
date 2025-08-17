
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gaming-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cricket-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gaming-gold/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gaming-blue/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-neon-green animate-neon-pulse">Cricket</span>
            <span className="text-foreground"> & </span>
            <span className="text-neon-gold animate-neon-pulse">Gaming</span>
            <br />
            <span className="text-foreground">Universe</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the thrill of live cricket matches and exciting mini-games. 
            Win coins, climb leaderboards, and become a gaming legend!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="btn-cricket text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Start Playing
            </Button>
            <Button className="btn-gaming text-lg px-8 py-4">
              <Zap className="w-5 h-5 mr-2" />
              Mini Games
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="card-gaming text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">10K+</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            <div className="card-gaming text-center">
              <div className="text-3xl font-bold text-neon-gold mb-2">₹50L+</div>
              <div className="text-muted-foreground">Rewards Distributed</div>
            </div>
            <div className="card-gaming text-center">
              <div className="text-3xl font-bold text-gaming-blue mb-2">24/7</div>
              <div className="text-muted-foreground">Live Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

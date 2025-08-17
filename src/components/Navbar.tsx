
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, User, Coins, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cricket-primary to-cricket-accent rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neon-green">CricketGaming</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-cricket-accent transition-colors font-medium">Home</a>
            <a href="#cricket" className="text-foreground hover:text-cricket-accent transition-colors font-medium">Cricket</a>
            <a href="#games" className="text-foreground hover:text-cricket-accent transition-colors font-medium">Games</a>
            <a href="#leaderboard" className="text-foreground hover:text-cricket-accent transition-colors font-medium">Leaderboard</a>
            <a href="#rewards" className="text-foreground hover:text-cricket-accent transition-colors font-medium">Rewards</a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-secondary/50 px-4 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-gaming-gold" />
              <span className="text-neon-gold font-bold">12,450</span>
            </div>
            <Button variant="outline" size="sm" className="btn-outline-neon">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

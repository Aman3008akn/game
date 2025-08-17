
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/80 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cricket-primary to-cricket-accent rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-neon-green">CricketGaming</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Experience the ultimate cricket and gaming platform. Play, win, and become a legend.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-muted-foreground hover:text-cricket-accent transition-colors">Home</a></li>
              <li><a href="#cricket" className="text-muted-foreground hover:text-cricket-accent transition-colors">Cricket</a></li>
              <li><a href="#games" className="text-muted-foreground hover:text-cricket-accent transition-colors">Games</a></li>
              <li><a href="#leaderboard" className="text-muted-foreground hover:text-cricket-accent transition-colors">Leaderboard</a></li>
              <li><a href="#rewards" className="text-muted-foreground hover:text-cricket-accent transition-colors">Rewards</a></li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Popular Games</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-cricket-accent transition-colors">Aviator</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-cricket-accent transition-colors">Mines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-cricket-accent transition-colors">Live Cricket</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-cricket-accent transition-colors">Tournaments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-cricket-accent transition-colors">Mini Games</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@cricketgaming.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 CricketGaming. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-cricket-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cricket-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cricket-accent transition-colors">Responsible Gaming</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

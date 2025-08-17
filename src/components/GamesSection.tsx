import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Bomb, Coins, Star, Users, TrendingUp } from 'lucide-react';
import AviatorGame from './games/AviatorGame';
import MinesGame from './games/MinesGame';

const GamesSection = () => {
  const [aviatorMultiplier, setAviatorMultiplier] = useState(1.00);
  const [isAviatorFlying, setIsAviatorFlying] = useState(false);
  const [minesRevealedCount, setMinesRevealedCount] = useState(0);
  const [showAviatorGame, setShowAviatorGame] = useState(false);
  const [showMinesGame, setShowMinesGame] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalWon: "₹2.4Cr",
    activePlayers: 3247,
    biggestWin: "15.6x"
  });

  // Aviator game simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAviatorFlying) {
      interval = setInterval(() => {
        setAviatorMultiplier(prev => {
          const newMultiplier = prev + (Math.random() * 0.15);
          // Random crash between 1.2x and 20x
          if (newMultiplier > (1.2 + Math.random() * 18.8)) {
            setIsAviatorFlying(false);
            setTimeout(() => {
              setAviatorMultiplier(1.00);
              setIsAviatorFlying(true);
            }, 3000);
            return prev;
          }
          return newMultiplier;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAviatorFlying]);

  const startAviator = () => {
    setShowAviatorGame(true);
  };

  const playMines = () => {
    setShowMinesGame(true);
  };

  const games = [
    {
      id: 1,
      name: "Aviator",
      icon: Plane,
      description: "Watch the plane fly and cash out before it crashes!",
      currentMultiplier: isAviatorFlying ? `${aviatorMultiplier.toFixed(2)}x` : "1.00x",
      status: isAviatorFlying ? "Flying" : "Ready",
      players: "1,247",
      category: "Crash Game"
    },
    {
      id: 2, 
      name: "Mines",
      icon: Bomb,
      description: "Navigate through the minefield to find hidden treasures",
      currentMultiplier: minesRevealedCount > 0 ? `${(minesRevealedCount * 1.2).toFixed(1)}x` : "1.0x", 
      status: minesRevealedCount > 0 ? "Playing" : "Ready",
      players: "892",
      category: "Strategy"
    }
  ];

  const recentWins = [
    { player: "CricketKing", game: "Aviator", amount: "₹12,450", multiplier: "8.2x" },
    { player: "BombSquad", game: "Mines", amount: "₹8,760", multiplier: "12.4x" },
    { player: "FlyHigh", game: "Aviator", amount: "₹15,220", multiplier: "15.6x" }
  ];

  return (
    <section id="games" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-neon-gold">Mini Games Hub</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your luck and strategy with our exciting collection of mini-games
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <Card key={game.id} className="card-gaming hover:animate-glow overflow-hidden">
                <CardHeader className="relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-gaming-gold to-gaming-blue rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-neon-gold">{game.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {game.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neon-green">{game.currentMultiplier}</div>
                      <div className="text-sm text-muted-foreground">Current</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{game.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-cricket-accent" />
                      <span>{game.players} playing</span>
                    </div>
                    <Badge 
                      variant={game.status === "Flying" ? "destructive" : game.status === "Playing" ? "secondary" : "default"}
                      className={game.status === "Flying" ? "bg-red-500 animate-pulse" : game.status === "Playing" ? "bg-yellow-500 animate-pulse" : "bg-cricket-accent"}
                    >
                      {game.status}
                    </Badge>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full btn-gaming text-lg py-3 hover:scale-105 transition-transform" 
                      onClick={() => game.name === "Aviator" ? startAviator() : playMines()}
                    >
                      {game.name === "Aviator" && isAviatorFlying ? "Cash Out!" : "Play Now"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full btn-outline-neon hover:scale-105 transition-transform"
                      onClick={() => alert(`${game.name} Stats: Win Rate: 65%, Avg Multiplier: 3.2x, Total Plays: 1,247`)}
                    >
                      View Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Big Wins */}
        <Card className="card-gaming">
          <CardHeader>
            <CardTitle className="flex items-center text-neon-gold">
              <Star className="w-6 h-6 mr-2" />
              Recent Big Wins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWins.map((win, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cricket-accent to-gaming-gold rounded-full flex items-center justify-center font-bold text-black">
                      {win.player[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{win.player}</div>
                      <div className="text-sm text-muted-foreground">{win.game}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-neon-green">{win.amount}</div>
                    <div className="text-sm text-neon-gold">{win.multiplier}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Coins className="w-8 h-8 text-gaming-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-gold">₹2.4Cr</div>
              <div className="text-sm text-muted-foreground">Total Won Today</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-cricket-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-green">3,247</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 text-gaming-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-blue">15.6x</div>
              <div className="text-sm text-muted-foreground">Biggest Win Today</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Star className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-purple">98.5%</div>
              <div className="text-sm text-muted-foreground">Return Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Modals */}
        <AviatorGame 
          isOpen={showAviatorGame} 
          onClose={() => setShowAviatorGame(false)} 
        />
        <MinesGame 
          isOpen={showMinesGame} 
          onClose={() => setShowMinesGame(false)} 
        />
      </div>
    </section>
  );
};

export default GamesSection;
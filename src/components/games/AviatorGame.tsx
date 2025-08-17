import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, TrendingUp, Coins } from 'lucide-react';

interface AviatorGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const AviatorGame: React.FC<AviatorGameProps> = ({ isOpen, onClose }) => {
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [hasFlown, setHasFlown] = useState(false);
  const [betAmount, setBetAmount] = useState(100);
  const [hasBet, setHasBet] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [planePosition, setPlanePosition] = useState({ x: 5, y: 80 });
  const [crashPoint, setCrashPoint] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random crash point
  const generateCrashPoint = () => {
    const random = Math.random();
    if (random < 0.5) return 1.2 + Math.random() * 2.8; // 1.2x - 4x (50%)
    if (random < 0.8) return 4 + Math.random() * 6; // 4x - 10x (30%)
    return 10 + Math.random() * 40; // 10x - 50x (20%)
  };

  // Start new round
  const startRound = () => {
    const newCrashPoint = generateCrashPoint();
    setCrashPoint(newCrashPoint);
    setMultiplier(1.00);
    setIsFlying(true);
    setHasFlown(true);
    setCashedOut(false);
    setWinAmount(0);
    setPlanePosition({ x: 5, y: 80 });
  };

  // Place bet
  const placeBet = () => {
    if (betAmount >= 10) {
      setHasBet(true);
      if (!isFlying && !hasFlown) {
        setTimeout(startRound, 2000); // Start round after 2 seconds
      }
    }
  };

  // Cash out
  const cashOut = () => {
    if (isFlying && hasBet && !cashedOut) {
      setCashedOut(true);
      setWinAmount(betAmount * multiplier);
    }
  };

  // Game logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isFlying) {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const newMultiplier = prev + 0.01 + (prev * 0.001);
          
          // Update plane position
          setPlanePosition(prevPos => ({
            x: Math.min(95, prevPos.x + 0.8),
            y: Math.max(10, prevPos.y - 0.6)
          }));
          
          // Check for crash
          if (newMultiplier >= crashPoint) {
            setIsFlying(false);
            setTimeout(() => {
              setHasFlown(false);
              setHasBet(false);
              setMultiplier(1.00);
            }, 3000);
            return prev;
          }
          
          return newMultiplier;
        });
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isFlying, crashPoint]);

  // Draw multiplier curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    if (hasFlown) {
      // Draw multiplier curve
      ctx.strokeStyle = isFlying ? '#10b981' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const progress = (multiplier - 1) / Math.max(crashPoint - 1, 1);
      const curveX = Math.min(canvas.width * 0.9, progress * canvas.width);
      const curveY = canvas.height - (Math.log(multiplier) / Math.log(10) * canvas.height * 0.3 + 50);
      
      ctx.moveTo(0, canvas.height - 50);
      ctx.quadraticCurveTo(curveX * 0.5, curveY, curveX, Math.max(10, curveY));
      ctx.stroke();
    }
  }, [multiplier, isFlying, hasFlown, crashPoint]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] bg-gradient-to-br from-background to-secondary border-cricket-accent">
        <DialogHeader>
          <DialogTitle className="text-2xl text-neon-gold flex items-center">
            <Plane className="w-6 h-6 mr-2" />
            Aviator Game
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Game Area */}
          <div className="lg:col-span-3 relative">
            <Card className="h-full bg-gradient-to-br from-secondary/50 to-background border-border">
              <CardContent className="p-0 h-full relative overflow-hidden">
                {/* Multiplier Display */}
                <div className="absolute top-4 left-4 z-20">
                  <div className={`text-6xl font-bold ${isFlying ? 'text-neon-green animate-pulse' : hasFlown ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {multiplier.toFixed(2)}x
                  </div>
                  {!isFlying && hasFlown && (
                    <div className="text-red-500 text-xl font-bold animate-bounce">
                      CRASHED!
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="absolute top-4 right-4 z-20">
                  {!hasFlown && (
                    <div className="text-cricket-accent text-lg animate-pulse">
                      Waiting for next round...
                    </div>
                  )}
                  {cashedOut && (
                    <div className="text-neon-green text-xl font-bold flex items-center">
                      <Coins className="w-5 h-5 mr-1" />
                      Won: ₹{winAmount.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Game Canvas */}
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Flying Plane */}
                {hasFlown && (
                  <div 
                    className={`absolute transition-all duration-75 z-10 ${isFlying ? 'text-neon-green' : 'text-red-500'}`}
                    style={{
                      left: `${planePosition.x}%`,
                      top: `${planePosition.y}%`,
                      transform: 'translate(-50%, -50%) rotate(-20deg)'
                    }}
                  >
                    <Plane className={`w-8 h-8 ${isFlying ? 'animate-bounce' : 'animate-spin'}`} />
                  </div>
                )}

                {/* Crash Effect */}
                {!isFlying && hasFlown && (
                  <div 
                    className="absolute z-15"
                    style={{
                      left: `${planePosition.x}%`,
                      top: `${planePosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="w-16 h-16 bg-red-500/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse opacity-50"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="card-gaming">
              <CardContent className="p-4 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Bet Amount</label>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    min="10"
                    max="10000"
                    disabled={hasBet}
                    className="text-center text-lg font-bold"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setBetAmount(prev => Math.max(10, prev / 2))}
                    disabled={hasBet}
                  >
                    1/2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setBetAmount(prev => Math.min(10000, prev * 2))}
                    disabled={hasBet}
                  >
                    2x
                  </Button>
                </div>

                {!hasBet ? (
                  <Button 
                    className="w-full btn-gaming text-lg py-3"
                    onClick={placeBet}
                    disabled={betAmount < 10}
                  >
                    Place Bet (₹{betAmount})
                  </Button>
                ) : (
                  <Button 
                    className={`w-full text-lg py-3 ${isFlying && !cashedOut ? 'bg-neon-green hover:bg-neon-green/80 text-black animate-pulse' : 'bg-muted'}`}
                    onClick={cashOut}
                    disabled={!isFlying || cashedOut}
                  >
                    {cashedOut ? `Cashed Out at ${multiplier.toFixed(2)}x` : isFlying ? `Cash Out (₹${(betAmount * multiplier).toFixed(2)})` : 'Next Round'}
                  </Button>
                )}

                <div className="text-center text-sm text-muted-foreground">
                  {isFlying ? 'Plane is flying! Cash out before it crashes!' : 
                   hasFlown ? 'Round ended! Place bet for next round.' :
                   hasBet ? 'Round starting soon...' : 'Place your bet to play'}
                </div>
              </CardContent>
            </Card>

            {/* Recent Multipliers */}
            <Card className="card-gaming">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 text-neon-gold">Recent Results</h3>
                <div className="flex flex-wrap gap-2">
                  {[2.34, 1.57, 8.92, 1.23, 15.67, 3.45, 1.89, 4.56].map((mult, i) => (
                    <div 
                      key={i}
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        mult >= 10 ? 'bg-purple-500/20 text-purple-300' :
                        mult >= 2 ? 'bg-neon-green/20 text-neon-green' :
                        'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {mult.toFixed(2)}x
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AviatorGame;
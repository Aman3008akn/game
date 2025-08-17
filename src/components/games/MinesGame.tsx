import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bomb, Gem, Coins, RotateCcw } from 'lucide-react';

interface MinesGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const MinesGame: React.FC<MinesGameProps> = ({ isOpen, onClose }) => {
  const [betAmount, setBetAmount] = useState(100);
  const [minesCount, setMinesCount] = useState(3);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'won' | 'lost'>('betting');
  const [grid, setGrid] = useState<Array<Array<'hidden' | 'gem' | 'mine'>>>(
    Array(5).fill(null).map(() => Array(5).fill('hidden'))
  );
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());
  const [minePositions, setMinePositions] = useState<Set<string>>(new Set());
  const [multiplier, setMultiplier] = useState(1.0);
  const [gemsFound, setGemsFound] = useState(0);
  const [winAmount, setWinAmount] = useState(0);

  // Calculate multiplier based on gems found and mines count
  const calculateMultiplier = (gems: number, mines: number) => {
    if (gems === 0) return 1.0;
    const totalCells = 25;
    const safeCells = totalCells - mines;
    let mult = 1.0;
    
    for (let i = 0; i < gems; i++) {
      mult *= (safeCells - i) / (totalCells - mines - i);
    }
    
    return mult * (1 + mines * 0.1);
  };

  // Generate mine positions
  const generateMinePositions = (minesCount: number): Set<string> => {
    const positions = new Set<string>();
    while (positions.size < minesCount) {
      const row = Math.floor(Math.random() * 5);
      const col = Math.floor(Math.random() * 5);
      positions.add(`${row}-${col}`);
    }
    return positions;
  };

  // Start new game
  const startGame = () => {
    if (betAmount < 10) return;
    
    const mines = generateMinePositions(minesCount);
    setMinePositions(mines);
    setRevealedCells(new Set());
    setGameState('playing');
    setGemsFound(0);
    setMultiplier(1.0);
    setWinAmount(0);
    setGrid(Array(5).fill(null).map(() => Array(5).fill('hidden')));
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;
    
    const cellKey = `${row}-${col}`;
    if (revealedCells.has(cellKey)) return;

    const newRevealed = new Set(revealedCells);
    newRevealed.add(cellKey);
    setRevealedCells(newRevealed);

    if (minePositions.has(cellKey)) {
      // Hit a mine - game over
      setGameState('lost');
      // Reveal all mines
      minePositions.forEach(mine => newRevealed.add(mine));
    } else {
      // Found a gem
      const newGemsFound = gemsFound + 1;
      setGemsFound(newGemsFound);
      
      const newMultiplier = calculateMultiplier(newGemsFound, minesCount);
      setMultiplier(newMultiplier);
      setWinAmount(betAmount * newMultiplier);
    }
  };

  // Cash out
  const cashOut = () => {
    if (gameState === 'playing' && gemsFound > 0) {
      setGameState('won');
    }
  };

  // Reset game
  const resetGame = () => {
    setGameState('betting');
    setGrid(Array(5).fill(null).map(() => Array(5).fill('hidden')));
    setRevealedCells(new Set());
    setMinePositions(new Set());
    setGemsFound(0);
    setMultiplier(1.0);
    setWinAmount(0);
  };

  // Get cell content
  const getCellContent = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const isRevealed = revealedCells.has(cellKey);
    const isMine = minePositions.has(cellKey);

    if (!isRevealed) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted border border-border rounded-lg hover:from-secondary/80 transition-all cursor-pointer flex items-center justify-center">
          <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
        </div>
      );
    }

    if (isMine) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 border border-red-400 rounded-lg flex items-center justify-center animate-pulse">
          <Bomb className="w-6 h-6 text-white" />
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 border border-green-400 rounded-lg flex items-center justify-center animate-bounce">
        <Gem className="w-6 h-6 text-white" />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] bg-gradient-to-br from-background to-secondary border-cricket-accent">
        <DialogHeader>
          <DialogTitle className="text-2xl text-neon-gold flex items-center">
            <Bomb className="w-6 h-6 mr-2" />
            Mines Game
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Game Grid */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-secondary/50 to-background border-border">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Game Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="text-neon-green">
                      Gems Found: {gemsFound}
                    </Badge>
                    <Badge variant="secondary" className="text-gaming-gold">
                      Multiplier: {multiplier.toFixed(2)}x
                    </Badge>
                    {winAmount > 0 && (
                      <Badge variant="secondary" className="text-cricket-accent">
                        <Coins className="w-3 h-3 mr-1" />
                        ₹{winAmount.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  {gameState !== 'betting' && (
                    <Button variant="outline" size="sm" onClick={resetGame}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* 5x5 Grid */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto aspect-square">
                    {Array(5).fill(null).map((_, row) =>
                      Array(5).fill(null).map((_, col) => (
                        <div
                          key={`${row}-${col}`}
                          className="aspect-square"
                          onClick={() => handleCellClick(row, col)}
                        >
                          {getCellContent(row, col)}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Game Status */}
                <div className="text-center mt-4">
                  {gameState === 'betting' && (
                    <div className="text-muted-foreground">Set your bet and mines count, then start the game!</div>
                  )}
                  {gameState === 'playing' && (
                    <div className="text-cricket-accent animate-pulse">
                      Click on tiles to reveal gems. Avoid the mines!
                    </div>
                  )}
                  {gameState === 'won' && (
                    <div className="text-neon-green text-xl font-bold animate-bounce">
                      🎉 You Won ₹{winAmount.toFixed(2)}! 🎉
                    </div>
                  )}
                  {gameState === 'lost' && (
                    <div className="text-red-500 text-xl font-bold animate-pulse">
                      💥 Game Over! You hit a mine! 💥
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="card-gaming">
              <CardContent className="p-4 space-y-4">
                {gameState === 'betting' && (
                  <>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Bet Amount</label>
                      <Input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        min="10"
                        max="10000"
                        className="text-center text-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Mines Count</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 3, 5, 7, 10, 15].map((count) => (
                          <Button
                            key={count}
                            variant={minesCount === count ? "default" : "outline"}
                            size="sm"
                            onClick={() => setMinesCount(count)}
                            className={minesCount === count ? "bg-cricket-accent" : ""}
                          >
                            {count}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full btn-gaming text-lg py-3"
                      onClick={startGame}
                      disabled={betAmount < 10}
                    >
                      Start Game (₹{betAmount})
                    </Button>
                  </>
                )}

                {gameState === 'playing' && gemsFound > 0 && (
                  <Button 
                    className="w-full bg-neon-green hover:bg-neon-green/80 text-black text-lg py-3 animate-pulse"
                    onClick={cashOut}
                  >
                    Cash Out (₹{winAmount.toFixed(2)})
                  </Button>
                )}

                {(gameState === 'won' || gameState === 'lost') && (
                  <Button 
                    className="w-full btn-gaming text-lg py-3"
                    onClick={resetGame}
                  >
                    Play Again
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Game Info */}
            <Card className="card-gaming">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 text-neon-gold">Game Rules</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Click on tiles to reveal gems</p>
                  <p>• Avoid clicking on mines</p>
                  <p>• Each gem increases your multiplier</p>
                  <p>• Cash out anytime to secure winnings</p>
                  <p>• More mines = higher multipliers</p>
                </div>
              </CardContent>
            </Card>

            {/* Multiplier Table */}
            <Card className="card-gaming">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 text-neon-gold">Multipliers</h3>
                <div className="text-xs space-y-1">
                  {[1, 2, 3, 4, 5].map(gems => (
                    <div key={gems} className="flex justify-between">
                      <span>{gems} gems:</span>
                      <span className="text-neon-green">
                        {calculateMultiplier(gems, minesCount).toFixed(2)}x
                      </span>
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

export default MinesGame;
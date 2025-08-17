
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    {
      rank: 1,
      name: "CricketMaster",
      points: 145670,
      wins: 89,
      level: "Diamond",
      avatar: "CM",
      trend: "+15%"
    },
    {
      rank: 2, 
      name: "AviatorAce",
      points: 132450,
      wins: 76,
      level: "Platinum", 
      avatar: "AA",
      trend: "+12%"
    },
    {
      rank: 3,
      name: "MineHunter",
      points: 128930,
      wins: 71,
      level: "Platinum",
      avatar: "MH", 
      trend: "+8%"
    },
    {
      rank: 4,
      name: "BombDefuser",
      points: 115670,
      wins: 64,
      level: "Gold",
      avatar: "BD",
      trend: "+5%"
    },
    {
      rank: 5,
      name: "FlightRisk",
      points: 98450,
      wins: 58,
      level: "Gold", 
      avatar: "FR",
      trend: "+3%"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-gaming-gold" />;
      case 2: return <Trophy className="w-6 h-6 text-muted-foreground" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Award className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Diamond": return "text-cricket-accent";
      case "Platinum": return "text-muted-foreground";
      case "Gold": return "text-gaming-gold";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section id="leaderboard" className="py-20 bg-gaming-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-neon-green">Top Players Leaderboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See where you stand among the gaming elite. Climb the ranks and earn exclusive rewards!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topPlayers.slice(0, 3).map((player) => (
              <Card 
                key={player.rank} 
                className={`card-gaming text-center ${
                  player.rank === 1 ? 'ring-2 ring-gaming-gold animate-glow' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-cricket-accent to-gaming-gold rounded-full flex items-center justify-center text-xl font-bold text-black mx-auto mb-4">
                    {player.avatar}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{player.name}</h3>
                  <Badge className={`mb-3 ${getLevelColor(player.level)}`} variant="outline">
                    {player.level}
                  </Badge>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-neon-gold">
                      {player.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Points</div>
                    <div className="flex justify-between text-sm">
                      <span>Wins: {player.wins}</span>
                      <span className="text-cricket-accent flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {player.trend}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="card-gaming">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-gold">
                <Trophy className="w-6 h-6 mr-2" />
                Complete Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlayers.map((player) => (
                  <div 
                    key={player.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                      player.rank <= 3 
                        ? 'bg-gradient-to-r from-secondary/20 to-cricket-secondary/20 border-cricket-accent/30' 
                        : 'bg-secondary/10 border-border/30'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {player.rank <= 3 ? getRankIcon(player.rank) : (
                          <span className="text-lg font-bold text-muted-foreground">#{player.rank}</span>
                        )}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-cricket-accent to-gaming-gold rounded-full flex items-center justify-center font-bold text-black">
                        {player.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{player.name}</div>
                        <Badge className={getLevelColor(player.level)} variant="outline">
                          {player.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-neon-gold">{player.points.toLocaleString()}</div>
                        <div className="text-muted-foreground">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-neon-green">{player.wins}</div>
                        <div className="text-muted-foreground">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-cricket-accent flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {player.trend}
                        </div>
                        <div className="text-muted-foreground">Trend</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current User Rank */}
          <Card className="card-gaming mt-6 ring-2 ring-cricket-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-cricket-accent">#47</div>
                  <div className="w-10 h-10 bg-gradient-to-r from-cricket-accent to-gaming-gold rounded-full flex items-center justify-center font-bold text-black">
                    YU
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">You</div>
                    <Badge className="text-gaming-gold" variant="outline">
                      Silver
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-neon-gold">12,450</div>
                    <div className="text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-neon-green">18</div>
                    <div className="text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-cricket-accent flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23%
                    </div>
                    <div className="text-muted-foreground">This Week</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Coins, Trophy, Target, Calendar } from 'lucide-react';

const RewardsSection = () => {
  const dailyRewards = [
    { day: 1, reward: "100 Coins", claimed: true },
    { day: 2, reward: "200 Coins", claimed: true },
    { day: 3, reward: "Free Spin", claimed: true },
    { day: 4, reward: "500 Coins", claimed: false, current: true },
    { day: 5, reward: "Bonus Game", claimed: false },
    { day: 6, reward: "1000 Coins", claimed: false },
    { day: 7, reward: "Mystery Box", claimed: false }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Win",
      description: "Win your first game",
      progress: 100,
      reward: "500 Coins",
      completed: true,
      icon: Trophy
    },
    {
      id: 2,
      title: "Aviator Pro",
      description: "Cash out at 10x multiplier",
      progress: 75,
      reward: "2000 Coins",
      completed: false,
      icon: Target
    },
    {
      id: 3,
      title: "Mine Master",
      description: "Clear 20 mines in one game",
      progress: 45,
      reward: "1500 Coins",
      completed: false,
      icon: Star
    }
  ];

  const levelRewards = [
    { level: 1, requirement: "0 XP", reward: "Welcome Bonus", unlocked: true },
    { level: 2, requirement: "1000 XP", reward: "Daily Bonus +50%", unlocked: true },
    { level: 3, requirement: "2500 XP", reward: "VIP Games Access", unlocked: true },
    { level: 4, requirement: "5000 XP", reward: "Personal Manager", unlocked: false, current: true },
    { level: 5, requirement: "10000 XP", reward: "Exclusive Tournaments", unlocked: false }
  ];

  return (
    <section id="rewards" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-neon-gold">Rewards & Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn rewards daily, unlock achievements, and level up for exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Login Rewards */}
          <Card className="card-gaming">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-green">
                <Calendar className="w-6 h-6 mr-2" />
                Daily Login Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-cricket-accent mb-2">Day 3</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {dailyRewards.map((day) => (
                  <div 
                    key={day.day}
                    className={`text-center p-2 rounded-lg border transition-all ${
                      day.claimed 
                        ? 'bg-cricket-accent/20 border-cricket-accent text-cricket-accent' 
                        : day.current
                        ? 'bg-gaming-gold/20 border-gaming-gold text-gaming-gold animate-pulse'
                        : 'bg-secondary/30 border-border/30 text-muted-foreground'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">Day {day.day}</div>
                    <div className="text-xs">{day.reward}</div>
                    {day.claimed && <div className="text-xs mt-1">✓</div>}
                  </div>
                ))}
              </div>
              
              <Button className="w-full btn-cricket">
                <Gift className="w-4 h-4 mr-2" />
                Claim Daily Reward
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="card-gaming">
            <CardHeader>
              <CardTitle className="flex items-center text-neon-gold">
                <Star className="w-6 h-6 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.completed 
                        ? 'bg-cricket-accent/10 border-cricket-accent/30' 
                        : 'bg-secondary/30 border-border/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.completed ? 'bg-cricket-accent' : 'bg-secondary'
                        }`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                      {achievement.completed && (
                        <Badge className="bg-cricket-accent text-black">
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="text-xs text-gaming-gold font-semibold">
                        Reward: {achievement.reward}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Level Progression */}
          <Card className="card-gaming">
            <CardHeader>
              <CardTitle className="flex items-center text-gaming-blue">
                <Trophy className="w-6 h-6 mr-2" />
                Level Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gaming-blue mb-2">Level 3</div>
                <div className="text-sm text-muted-foreground mb-3">VIP Player</div>
                <Progress value={60} className="h-3" />
                <div className="text-xs text-muted-foreground mt-2">3,000 / 5,000 XP to next level</div>
              </div>
              
              <div className="space-y-3">
                {levelRewards.map((level) => (
                  <div 
                    key={level.level}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      level.unlocked 
                        ? 'bg-cricket-accent/10 border-cricket-accent/30' 
                        : level.current
                        ? 'bg-gaming-gold/10 border-gaming-gold/30'
                        : 'bg-secondary/30 border-border/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        level.unlocked 
                          ? 'bg-cricket-accent text-black' 
                          : level.current
                          ? 'bg-gaming-gold text-black'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {level.level}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{level.reward}</div>
                        <div className="text-xs text-muted-foreground">{level.requirement}</div>
                      </div>
                    </div>
                    
                    {level.unlocked ? (
                      <Badge className="bg-cricket-accent text-black">
                        Unlocked
                      </Badge>
                    ) : level.current ? (
                      <Badge className="bg-gaming-gold text-black">
                        In Progress
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Locked
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Coins className="w-8 h-8 text-gaming-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-gold">12,450</div>
              <div className="text-sm text-muted-foreground">Total Coins</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Star className="w-8 h-8 text-cricket-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-green">18</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Trophy className="w-8 h-8 text-gaming-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-blue">3</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Gift className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-purple">7</div>
              <div className="text-sm text-muted-foreground">Days Streak</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;

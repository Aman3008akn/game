
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';

const CricketSection = () => {
  const liveMatches = [
    {
      id: 1,
      team1: "India",
      team2: "Australia", 
      team1Score: "287/4",
      team2Score: "156/7",
      status: "LIVE",
      overs: "42.3",
      target: "288"
    },
    {
      id: 2,
      team1: "England", 
      team2: "Pakistan",
      team1Score: "245/8",
      team2Score: "189/5", 
      status: "LIVE",
      overs: "38.1",
      target: "246"
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      team1: "South Africa",
      team2: "New Zealand",
      date: "Today, 7:30 PM",
      tournament: "World Cup"
    },
    {
      id: 2,
      team1: "Sri Lanka", 
      team2: "Bangladesh",
      date: "Tomorrow, 2:00 PM",
      tournament: "Asia Cup"
    }
  ];

  return (
    <section id="cricket" className="py-20 bg-cricket-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-neon-green">Live Cricket Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow live matches, track scores, and place your predictions on ongoing games
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Live Matches */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse" />
              Live Matches
            </h3>
            <div className="space-y-4">
              {liveMatches.map((match) => (
                <Card key={match.id} className="card-gaming hover:animate-glow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="destructive" className="bg-red-500">
                        {match.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Overs: {match.overs}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cricket-accent rounded-full flex items-center justify-center text-sm font-bold">
                            {match.team1[0]}
                          </div>
                          <span className="font-semibold">{match.team1}</span>
                        </div>
                        <span className="text-lg font-bold text-neon-green">{match.team1Score}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gaming-gold rounded-full flex items-center justify-center text-sm font-bold text-black">
                            {match.team2[0]}
                          </div>
                          <span className="font-semibold">{match.team2}</span>
                        </div>
                        <span className="text-lg font-bold text-neon-gold">{match.team2Score}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Target: {match.target}
                        </span>
                        <Button className="btn-outline-neon" size="sm">
                          Watch Live
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Matches */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-cricket-accent" />
              Upcoming Matches
            </h3>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="card-gaming">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-secondary">
                        {match.tournament}
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {match.date}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-cricket-accent rounded-full flex items-center justify-center text-sm font-bold">
                          {match.team1[0]}
                        </div>
                        <span className="font-semibold">{match.team1}</span>
                      </div>
                      <span className="text-muted-foreground font-bold">VS</span>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{match.team2}</span>
                        <div className="w-8 h-8 bg-gaming-gold rounded-full flex items-center justify-center text-sm font-bold text-black">
                          {match.team2[0]}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full btn-cricket">
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-cricket-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-green">45K</div>
              <div className="text-sm text-muted-foreground">Watching Now</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 text-gaming-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-neon-gold">24</div>
              <div className="text-sm text-muted-foreground">Live Matches</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Calendar className="w-8 h-8 text-gaming-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-blue">156</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
          <Card className="card-gaming text-center">
            <CardContent className="p-4">
              <Clock className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-purple">12</div>
              <div className="text-sm text-muted-foreground">Next 24hrs</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CricketSection;

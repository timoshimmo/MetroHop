'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Plus, Star, History, Clock, Calendar, ArrowRight, Bus, Globe } from 'lucide-react';
import { TicketCard } from '@/components/ticket-card';
import { myTickets, promos } from '@/lib/data';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(58 * 60 + 30); // 58:30 in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-2xl font-bold font-headline">Bryan Alexander</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">₦25,000</p>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Top up
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 120 Points</p>
                <p className="font-semibold text-primary">Silver Tier</p>
              </div>
              <Progress value={60} className="h-2" />
            </div>
             <Link href="#" className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <History className="mr-2 h-4 w-4" />
              Last Scanned History <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <Link href="/book-seat">
            <Card className="shadow-md hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center h-32">
                <Globe className="h-8 w-8 text-primary" />
                <p className="font-semibold">Inter-city</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/book-seat">
            <Card className="shadow-md hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center h-32">
                <Bus className="h-8 w-8 text-primary" />
                <p className="font-semibold">Intra-city</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="bg-red-50 border-red-200 shadow-md">
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-destructive">Pay Before</h3>
                    <Badge variant="destructive" className="flex gap-1.5">
                        <Clock className="h-3 w-3" />
                        <span>23 : 55 : 12</span>
                    </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="font-bold text-lg">05:15</p>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        <p>1hr 20m</p>
                        <ArrowRight className="w-full" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-bold text-lg">10:35</p>
                    </div>
                     <div className="text-right">
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> 12 Oct 2024</p>
                    </div>
                </div>
                 <div className="text-sm text-muted-foreground">
                    <p>Allen Avenue Junction... - Terminal Ebute...</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bus className="h-4 w-4 text-primary" />
                  <p className="font-semibold">TransBus</p>
                  <p className="text-muted-foreground">Sajen Kenectus - vipbus 01</p>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Total Payment</p>
                    <p className="font-bold text-lg text-primary">₦40,000</p>
                </div>
                 <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                    Complete Payment in 00:{formatTime(timeLeft)}
                </Button>
            </CardContent>
        </Card>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-headline">My Ticket</h2>
            <Link href="/tickets" className="text-sm text-primary font-semibold">See All</Link>
          </div>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All Ticket</TabsTrigger>
              <TabsTrigger value="intercity">Intercity</TabsTrigger>
              <TabsTrigger value="local">Local</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {myTickets.map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
            <TabsContent value="intercity" className="space-y-4">
              {myTickets.filter(t => t.category === 'Intercity').map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
            <TabsContent value="local" className="space-y-4">
               {myTickets.filter(t => t.category === 'Local').map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-headline">Promo</h2>
             <Link href="#" className="text-sm text-primary font-semibold">See all promo</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {promos.map((promo) => (
              <Card key={promo.id} className="min-w-[300px] flex-shrink-0 shadow-md">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Image src={promo.iconUrl} alt={promo.title} width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground">{promo.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

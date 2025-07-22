'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Settings, Plus, Star, History, ArrowRight, Bus, Globe, Circle, CarFront } from 'lucide-react';
import { TicketCard } from '@/components/ticket-card';
import { myTickets, promos, historyTrips } from '@/lib/data';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const activeTickets = myTickets.filter(
    (ticket) =>
      ticket.status === 'Active' &&
      ticket.from.toLowerCase().includes('lekki') &&
      ticket.to.toLowerCase().includes('ajah')
  );

  const recentHistory = historyTrips.slice(0, 2);

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
              <Link href="/wallet">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Top up
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 120 Points</p>
                <p className="font-semibold text-primary">Silver Tier</p>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-3 gap-4">
          <Link href="/inter-city">
            <Card className="shadow-md hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="p-3 flex flex-col items-center justify-center gap-2 text-center h-28">
                <Globe className="h-7 w-7 text-primary" />
                <p className="font-semibold text-sm">Inter-city</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/routes">
            <Card className="shadow-md hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="p-3 flex flex-col items-center justify-center gap-2 text-center h-28">
                <Bus className="h-7 w-7 text-primary" />
                <p className="font-semibold text-sm">Intra-city</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rent-a-bus">
            <Card className="shadow-md hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="p-3 flex flex-col items-center justify-center gap-2 text-center h-28">
                <CarFront className="h-7 w-7 text-primary" />
                <p className="font-semibold text-sm">Rent a Bus</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-headline">My Ticket</h2>
            <Link href="/tickets" className="text-sm text-primary font-semibold">See All</Link>
          </div>
          <div className="space-y-4">
              {activeTickets.length > 0 ? (
                activeTickets.map((trip) => (
                    <TicketCard key={trip.id} trip={trip} showCategory={false} />
                ))
              ) : (
                <p className="text-center text-muted-foreground pt-4">No active tickets found.</p>
              )}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-headline">Recent Trips</h2>
            <Link href="/history" className="text-sm text-primary font-semibold">See All</Link>
          </div>
           <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="divide-y">
                {recentHistory.map((trip) => (
                  <Link href={`/trip-status/${trip.id}`} key={trip.id} className="block hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between text-sm p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <Bus className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{trip.routeNumber}</p>
                          <p className="text-muted-foreground text-xs">{trip.departureTime}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">₦{trip.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
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

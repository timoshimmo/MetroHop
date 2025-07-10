
'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Bus, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Map } from '@/components/map';
import { stops, myTickets } from '@/lib/data';
import Link from 'next/link';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { notFound } from 'next/navigation';

export default function BusLiveLocationPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const price = priceParam ? parseInt(priceParam, 10) : 0;
  
  // A real app would get the ticket ID from the URL, but for now we find the first active one.
  const trip = useMemo(() => myTickets.find(t => t.status === 'Active'), []);

  const [busLocation, setBusLocation] = useState({ lat: 6.447, lng: 3.473 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult & { duration?: number } | null>(null);
  const [nextStopInfo, setNextStopInfo] = useState<{ name: string, eta: string }>({ name: 'Lekki Phase 1 Gate', eta: '25 mins' });

  const routeStops = useMemo(() => {
    if (!trip) return [];
    // A real app would have a more robust way to link trips to stops.
    // For this demo, we'll find stops that are part of the bus's route number.
    return stops.filter(s => s.routes.includes(trip.busNumber));
  }, [trip]);
  
  const currentTrip = useMemo(() => {
      if (!trip) return null;
      return {
        busNumber: trip.busNumber,
        operator: trip.name, // Assuming trip name is the operator
        driver: {
          name: 'Sajen Kenectus',
          avatarUrl: 'https://placehold.co/100x100.png',
        },
      }
  }, [trip]);


  useEffect(() => {
    if (!directions || !routeStops.length || !directions.routes[0]) return;

    const path = directions.routes[0].overview_path;

    if (path.length < 2) return;
    
    let step = 0;
    const animationSpeed = 0.005;

    const interval = setInterval(() => {
      const pointIndex = Math.floor(step * path.length);
      const newLocation = path[pointIndex];
      
      if (newLocation) {
        setBusLocation({ lat: newLocation.lat(), lng: newLocation.lng() });
      }

      step += animationSpeed;
      if (step > 1) {
        step = 0;
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [directions, routeStops]);
  
  if (!currentTrip) {
      // Or show a proper "not found" page
      return (
        <div className="flex flex-col h-full bg-muted/30 items-center justify-center">
             <p>No active trip found.</p>
             <Link href="/home">
                <Button variant="link">Go Home</Button>
             </Link>
        </div>
      )
  }

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-20">
        <Link href="/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Live Location</h1>
      </header>

      <div className="relative w-full h-1/2 bg-muted z-10">
        <Map 
            stops={routeStops} 
            busLocation={busLocation} 
            onDirectionsChange={setDirections}
        />
      </div>

      <main className="flex-1 overflow-y-auto bg-background">
        <Card className="rounded-t-2xl -mt-4 rounded-b-none shadow-none border-t-2 border-b-0">
          <CardHeader className="pt-6">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-accent rounded-lg">
                    <MapPin className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Next Stop</p>
                    <h2 className="font-bold text-lg">{nextStopInfo.name}</h2>
                    <p className="text-sm text-primary font-semibold">ETA: {nextStopInfo.eta}</p>
                </div>
              </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
             <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Bus className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h2 className="font-bold text-lg">{currentTrip.operator}</h2>
                    <p className="text-sm text-muted-foreground">{currentTrip.busNumber}</p>
                </div>
              </div>
               <Button variant="outline" size="icon">
                  <Phone className="h-5 w-5" />
               </Button>
            </div>
             <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={currentTrip.driver.avatarUrl} alt={currentTrip.driver.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{currentTrip.driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Your Driver</p>
                        <p className="font-semibold text-base">{currentTrip.driver.name}</p>
                    </div>
                </CardContent>
             </Card>
          </CardContent>
        </Card>
      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        {price > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-muted-foreground">Total Payment</span>
            <span className="text-2xl font-bold text-primary">₦{price.toLocaleString()}</span>
          </div>
        )}
        <Link href={`/payment?price=${price}`} className="w-full">
          <Button size="lg" className="w-full h-14 text-lg font-bold">
              Make Payment
          </Button>
        </Link>
      </footer>
    </div>
  );
}

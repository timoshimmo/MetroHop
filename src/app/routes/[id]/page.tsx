
'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Banknote, Bus, Clock, Armchair, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { allRoutes, localRoutes, stops } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Map } from '@/components/map';

export default function RouteDetailsPage({ params }: { params: { id: string } }) {
  const combinedRoutes = [...allRoutes, ...localRoutes];
  const route = combinedRoutes.find((r) => r.id === params.id);

  const [busLocation, setBusLocation] = useState({ lat: 6.447, lng: 3.473 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  if (!route) {
    notFound();
  }

  const routeStops = stops.filter(stop => stop.routes.includes(route.busNumber));
  
  useEffect(() => {
    if (!directions?.routes?.[0]?.overview_path) return;

    const path = directions.routes[0].overview_path;
    if (path.length < 2) return;
    
    let step = 0;
    const animationSpeed = 0.005; // Controls speed of marker

    const interval = setInterval(() => {
      // Ensure step loops back to 0
      step = (step + animationSpeed);
      if (step > 1) {
        step = 0;
      }
      
      const pointIndex = Math.floor(step * (path.length -1));
      const newLocation = path[pointIndex];
      
      if (newLocation) {
        setBusLocation({ lat: newLocation.lat(), lng: newLocation.lng() });
      }

    }, 1000); // Update every 100ms for smoother animation

    return () => clearInterval(interval);

  }, [directions]);


  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href={route.category === 'Local' ? '/inter-city' : '/routes'}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline truncate">{route.name}</h1>
      </header>

      <div className="relative w-full h-1/2 bg-muted">
        {routeStops.length > 0 ? (
          <Map 
            stops={stops} 
            busLocation={busLocation} 
            onDirectionsChange={setDirections}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No bus stops listed for this route.</p>
          </div>
        )}
      </div>
        
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Route Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-center">
              <div className="flex flex-col items-center gap-1 w-2/5">
                <p className="font-semibold truncate">{route.from}</p>
                <p className="text-xs text-muted-foreground">From</p>
              </div>
              <div className='flex items-center text-muted-foreground'>
                 <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col items-center gap-1 w-2/5">
                <p className="font-semibold truncate">{route.to}</p>
                 <p className="text-xs text-muted-foreground">To</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Departs</p>
                        <p className="font-semibold">{route.departureTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Arrives</p>
                        <p className="font-semibold">{route.arrivalTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Route No.</p>
                        <p className="font-semibold">{route.routeNumber}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-bold text-primary text-base">₦{route.price.toLocaleString()}</p>
                    </div>
                </div>
                {route.seatsAvailable !== undefined && (
                  <div className="flex items-center gap-2">
                      <Armchair className="h-5 w-5 text-muted-foreground" />
                      <div>
                          <p className="text-muted-foreground">Seats Available</p>
                          <p className="font-semibold">{route.seatsAvailable}</p>
                      </div>
                  </div>
                )}
                 <div className="flex items-center gap-2">
                    <Bus className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Bus No.</p>
                        <p className="font-semibold">{route.busNumber}</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Link href={`/book-seat?price=${route.price}`} className='w-full'>
          <Button size="lg" className="w-full h-14 text-lg font-bold">
            Book Now
          </Button>
        </Link>
      </footer>
    </div>
  );
}

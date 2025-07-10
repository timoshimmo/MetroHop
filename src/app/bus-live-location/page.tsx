
'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Bus, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Map } from '@/components/map';
import { stops } from '@/lib/data';
import Link from 'next/link';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function BusLiveLocationPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const price = priceParam ? parseInt(priceParam, 10) : 0;

  const [busLocation, setBusLocation] = useState({ lat: 6.447, lng: 3.473 });

  const currentTrip = useMemo(() => ({
    busNumber: 'CH-IK-01',
    operator: 'Chibuz Bus',
    driver: {
      name: 'Sajen Kenectus',
      avatarUrl: 'https://placehold.co/100x100.png',
    },
    currentLocationName: "Ikate Junction",
    eta: "5 mins"
  }), []);

  const routePath = useMemo(() => stops
    .filter(stop => stop.lat && stop.lng)
    .map(stop => ({ lat: stop.lat!, lng: stop.lng! })), 
  []);

  const getPointAlongPath = useCallback((path: google.maps.LatLngLiteral[], progress: number): google.maps.LatLngLiteral | null => {
    const totalDistance = path.reduce((acc, point, i) => {
        if (i === 0) return 0;
        const prev = path[i-1];
        return acc + google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(prev),
            new google.maps.LatLng(point)
        );
    }, 0);

    let distanceCovered = progress * totalDistance;

    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        const segmentDistance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(start),
            new google.maps.LatLng(end)
        );

        if (distanceCovered <= segmentDistance) {
            const fraction = distanceCovered / segmentDistance;
            const lat = start.lat + (end.lat - start.lat) * fraction;
            const lng = start.lng + (end.lng - start.lng) * fraction;
            return { lat, lng };
        }
        distanceCovered -= segmentDistance;
    }

    return path.length > 0 ? path[path.length - 1] : null;
}, []);


  useEffect(() => {
    // Animate bus along the route path
    if (routePath.length < 2) return;

    let step = 0;
    const animationSpeed = 0.005; // Adjust for slower or faster animation
    
    const interval = setInterval(() => {
        if (typeof window.google === 'undefined' || !window.google.maps.geometry) {
            // Google Maps API not loaded yet, wait.
            return;
        }

        const newLocation = getPointAlongPath(routePath, step);
        if(newLocation){
             setBusLocation(newLocation);
        }

      step += animationSpeed;
      if (step > 1) {
        step = 0; // Loop animation
      }

    }, 200); // Update every 200ms for smoother animation

    return () => clearInterval(interval);
  }, [routePath, getPointAlongPath]);

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
        <Map stops={stops} busLocation={busLocation} />
      </div>

      <main className="flex-1 overflow-y-auto bg-background">
        <Card className="rounded-t-2xl -mt-4 rounded-b-none shadow-none border-t-2 border-b-0">
          <CardHeader className="pt-6">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-accent rounded-lg">
                    <MapPin className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                    <h2 className="font-bold text-lg">{currentTrip.currentLocationName}</h2>
                    <p className="text-sm text-primary font-semibold">ETA: {currentTrip.eta}</p>
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

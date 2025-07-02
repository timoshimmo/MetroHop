'use client';

import { ArrowLeft, Bus, Phone, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Map } from '@/components/map';
import { stops } from '@/lib/data';
import Link from 'next/link';

export default function BusLiveLocationPage() {
  const currentTrip = {
    busNumber: 'CH-IK-01',
    operator: 'Chibuz Bus',
    driver: {
      name: 'Sajen Kenectus',
      avatarUrl: 'https://placehold.co/100x100.png',
    },
    currentStatus: 'Approaching Ikate Junction',
    etaToNextStop: '5 mins',
    nextStop: 'Ikate Junction',
  };

  const upcomingStops = stops.slice(2, 5); // Mock data for upcoming stops

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
        <Map stops={stops} />
      </div>

      <div className="flex-1 overflow-y-auto bg-background">
        <Card className="rounded-t-2xl -mt-4 rounded-b-none shadow-none border-t-2 border-b-0">
          <CardHeader className="pt-6">
            <div className="flex items-center justify-between">
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
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div>
                <h3 className="font-semibold mb-2">Trip Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-muted-foreground">Current Status</p>
                            <p className="font-semibold">{currentTrip.currentStatus}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-muted-foreground">ETA to next stop</p>
                            <p className="font-semibold">{currentTrip.etaToNextStop}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Upcoming Stops</h3>
              <ul className="space-y-4">
                {upcomingStops.map((stop, index) => (
                  <li key={stop.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                        <div className="h-5 w-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                           {index === 0 && <div className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                       {index < upcomingStops.length - 1 && <div className="w-0.5 h-6 bg-border" />}
                    </div>
                    <p className="font-medium">{stop.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

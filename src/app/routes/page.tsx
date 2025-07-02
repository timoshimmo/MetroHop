'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Bus, ArrowLeft } from 'lucide-react';
import { RouteCard } from '@/components/route-card';
import { allRoutes, locations, stops } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RoutesPage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Find Your Route</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search routes, locations, stops..." className="pl-10 h-12 text-base bg-card" />
        </div>

        <Tabs defaultValue="routes">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="routes">All Routes</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
                <TabsTrigger value="stops">Bus Stops</TabsTrigger>
            </TabsList>
            <TabsContent value="routes">
              <div className="space-y-4">
                {allRoutes.map((trip) => (
                  <RouteCard key={trip.id} trip={trip} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="locations">
              <div className="space-y-3">
                {locations.map((location) => (
                  <Card key={location.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                         <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold font-headline">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stops">
              <div className="space-y-3">
                 {stops.map((stop) => (
                  <Card key={stop.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Bus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold font-headline">{stop.name}</h3>
                        <p className="text-sm text-muted-foreground">Routes: {stop.routes.join(', ')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

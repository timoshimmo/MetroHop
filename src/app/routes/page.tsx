'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowLeft, Bus } from 'lucide-react';
import { allRoutes, locations, stops } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { RouteCard } from '@/components/route-card';

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const lowercasedQuery = searchQuery.toLowerCase();

  const filteredRoutes = allRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(lowercasedQuery) ||
      route.from.toLowerCase().includes(lowercasedQuery) ||
      route.to.toLowerCase().includes(lowercasedQuery)
  );

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowercasedQuery) ||
      location.address.toLowerCase().includes(lowercasedQuery)
  );

  const filteredStops = stops.filter((stop) =>
    stop.name.toLowerCase().includes(lowercasedQuery)
  );

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Routes</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Where to?"
            className="pl-10 h-12 text-base bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="routes">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="routes">All Routes</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="stops">Bus Stops</TabsTrigger>
          </TabsList>
          <TabsContent value="routes" className="mt-4 space-y-4">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} trip={route} />
            ))}
            {filteredRoutes.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">No routes found.</p>
            )}
          </TabsContent>
          <TabsContent value="locations" className="mt-4 space-y-3">
            {filteredLocations.map((location) => (
              <Card key={location.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {location.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
             {filteredLocations.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">No locations found.</p>
            )}
          </TabsContent>
          <TabsContent value="stops" className="mt-4 space-y-3">
            {filteredStops.map((stop) => (
              <Card key={stop.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Bus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{stop.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Serviced by {stop.routes.length} route(s)
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
             {filteredStops.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">No bus stops found.</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

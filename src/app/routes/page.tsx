import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Bus } from 'lucide-react';
import { RouteCard } from '@/components/route-card';
import { allRoutes, locations, stops } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export default function RoutesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">Find Your Route</h1>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search routes, locations, stops..." className="pl-10 h-12 text-base" />
        </div>
      </header>

      <main className="flex-1">
        <Tabs defaultValue="routes" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-3 sticky top-[113px] bg-background z-10 rounded-none border-b h-14">
            <TabsTrigger value="routes" className="h-full text-sm">All Routes</TabsTrigger>
            <TabsTrigger value="locations" className="h-full text-sm">Locations</TabsTrigger>
            <TabsTrigger value="stops" className="h-full text-sm">Bus Stops</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto p-4">
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
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Bus className="h-6 w-6 text-accent" />
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
          </div>
        </Tabs>
      </main>
    </div>
  );
}

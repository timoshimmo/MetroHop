import { ArrowLeft, ArrowRight, Bus, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { allRoutes, stops } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function RouteDetailsPage({ params }: { params: { id: string } }) {
  const route = allRoutes.find((r) => r.id === params.id);

  if (!route) {
    notFound();
  }

  const routeStops = stops.filter(stop => stop.routes.includes(route.busNumber));

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/routes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline truncate">{route.name}</h1>
      </header>

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
                    <Bus className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Bus No.</p>
                        <p className="font-semibold">{route.busNumber}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-bold text-primary text-base">₦{route.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>Bus Stops</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-0">
                    {routeStops.map((stop, index) => (
                        <li key={stop.id} className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                                    <div className='w-2 h-2 rounded-full bg-primary'></div>
                                </div>
                                {index < routeStops.length - 1 && <div className="w-0.5 flex-1 bg-border my-1 min-h-[2rem]"></div>}
                            </div>
                            <span className="font-medium -mt-1 pb-6">{stop.name}</span>
                        </li>
                    ))}
                    {routeStops.length === 0 && <p className='text-muted-foreground text-sm'>No bus stops listed for this route.</p>}
                </ul>
            </CardContent>
        </Card>
      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Link href="/book-seat" className='w-full'>
          <Button size="lg" className="w-full h-14 text-lg font-bold">
            Book Now
          </Button>
        </Link>
      </footer>
    </div>
  );
}

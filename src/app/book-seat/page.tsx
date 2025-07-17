'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map } from '@/components/map';
import { stops } from '@/lib/data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';




export default function BookSeatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const basePrice = priceParam ? parseInt(priceParam, 10) : 0;

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>('09:00 AM');
  const [passengers, setPassengers] = useState(1);
  
  const [busLocation, setBusLocation] = useState({ lat: 6.447, lng: 3.473 });
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const handlePassengerChange = (amount: number) => {
    setPassengers((prev) => Math.max(1, prev + amount));
  };

  const totalPrice = basePrice * passengers;

  useEffect(() => {
    if (!directions || !directions.routes[0]) return;

    const path = directions.routes[0].overview_path;

    if (path.length < 2) return;
    
    let step = 0;
    const animationSpeed = 0.005; // Controls speed of marker

    const interval = setInterval(() => {
      const pointIndex = Math.floor(step * (path.length -1));
      const newLocation = path[pointIndex];
      
      if (newLocation) {
        setBusLocation({ lat: newLocation.lat(), lng: newLocation.lng() });
      }

      step += animationSpeed;
      if (step > 1) {
        step = 0; // Loop animation
      }
    }, 1000); // Update every 100ms for smoother animation

    return () => clearInterval(interval);

  }, [directions]);

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-headline">Book a seat</h1>
      </header>

      <div className="relative w-full h-1/2 bg-muted">
        <Map 
            stops={stops} 
            busLocation={busLocation} 
            onDirectionsChange={setDirections}
        />
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-14",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        {date ? (
                          <span className="font-semibold">{format(date, "PPP")}</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Select onValueChange={setTime} defaultValue={time}>
                    <SelectTrigger className="w-full h-14 justify-start font-normal">
                         <div className="flex items-center text-left">
                            <Clock className="mr-2 h-4 w-4" />
                            <div>
                                <p className="text-xs text-muted-foreground">Time</p>
                                <SelectValue placeholder="Select time" />
                            </div>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                        <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                        <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-base">Passengers</h3>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                    <span className="font-medium">{passengers} Adult{passengers > 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handlePassengerChange(-1)} disabled={passengers <= 1}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold text-lg">{passengers}</span>
                        <Button variant="default" size="icon" className="h-8 w-8 rounded-full" onClick={() => handlePassengerChange(1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        {basePrice > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-muted-foreground">Total Payment</span>
            <span className="text-2xl font-bold text-primary">₦{totalPrice.toLocaleString()}</span>
          </div>
        )}
      
          <Link href={`/bus-live-location?price=${totalPrice}`} className="w-full">
            <Button size="lg" className="w-full h-14 text-lg font-bold">
              Find a bus
            </Button>
          </Link>
      </footer>
    </div>
  );
}

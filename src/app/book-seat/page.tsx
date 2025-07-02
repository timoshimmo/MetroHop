'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRightLeft, MapPin, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';

export default function BookSeatPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState(1);

  const handlePassengerChange = (amount: number) => {
    setPassengers((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Book a seat</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <div className="relative">
                <div className="space-y-2">
                  <div className="relative">
                    <label className="absolute left-10 -top-2.5 bg-card px-1 text-xs text-muted-foreground z-10">From</label>
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input defaultValue="Ikeja" className="pl-10 h-14 text-base" />
                  </div>
                  <div className="relative">
                    <label className="absolute left-10 -top-2.5 bg-card px-1 text-xs text-muted-foreground z-10">To</label>
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input defaultValue="Lekki" className="pl-10 h-14 text-base" />
                  </div>
                </div>
                <Button variant="outline" size="icon" className="absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-background border-2 hover:bg-muted z-10">
                  <ArrowRightLeft className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-base">Departure Date</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-0"
                />
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
        <Button size="lg" className="w-full h-14 text-lg font-bold">
          Find a bus
        </Button>
      </footer>
    </div>
  );
}

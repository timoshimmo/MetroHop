
'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, Bus, User, Clock, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const BUS_RATES = {
  '14': 150000,
  '30': 250000,
  '50': 400000,
};
const DAILY_RATE_DRIVER = 40000;

export default function RentABusPage() {
  const [rentalType, setRentalType] = useState('bus');
  const [duration, setDuration] = useState([1]); // Default 1 day
  const [busSize, setBusSize] = useState<keyof typeof BUS_RATES>('14');

  const dailyRate = useMemo(() => {
    if (rentalType === 'driver') {
      return DAILY_RATE_DRIVER;
    }
    return BUS_RATES[busSize];
  }, [rentalType, busSize]);

  const totalCost = useMemo(() => {
    return dailyRate * duration[0];
  }, [dailyRate, duration]);

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Rent a Bus/Driver</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Select Service</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={rentalType}
              className="grid grid-cols-2 gap-4"
              onValueChange={(value) => setRentalType(value)}
            >
              <div>
                <RadioGroupItem value="bus" id="bus" className="peer sr-only" />
                <Label
                  htmlFor="bus"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Bus className="mb-3 h-8 w-8" />
                  Bus
                </Label>
              </div>
              <div>
                <RadioGroupItem value="driver" id="driver" className="peer sr-only" />
                <Label
                  htmlFor="driver"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <User className="mb-3 h-8 w-8" />
                  Driver
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {rentalType === 'bus' && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Select Bus Size</CardTitle>
            </CardHeader>
            <CardContent>
               <RadioGroup 
                value={busSize}
                className="grid grid-cols-3 gap-4"
                onValueChange={(value) => setBusSize(value as keyof typeof BUS_RATES)}
              >
                {Object.keys(BUS_RATES).map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`bus-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`bus-${size}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
                    >
                      <Armchair className="mb-2 h-6 w-6" />
                      {size} Seater
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Select Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>Duration</span>
                </div>
                <span className="text-2xl font-bold font-headline text-primary">{duration[0]} day{duration[0] > 1 ? 's' : ''}</span>
            </div>
            <Slider
              defaultValue={[1]}
              value={duration}
              onValueChange={setDuration}
              max={30}
              step={1}
              min={1}
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
            <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold">Cost Breakdown</h3>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Service Type</span>
                    <span className="font-medium capitalize">{rentalType === 'bus' ? `${busSize}-Seater Bus` : 'Driver'} Rental</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Daily Rate</span>
                    <span className="font-medium">₦{dailyRate.toLocaleString()}/day</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{duration[0]} day(s)</span>
                </div>
                <Separator />
                 <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total Cost</span>
                    <span className="font-bold text-2xl text-primary">₦{totalCost.toLocaleString()}</span>
                </div>

            </CardContent>
        </Card>

      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Link href="/rent-a-bus/success" className="w-full">
            <Button size="lg" className="w-full h-14 text-lg font-bold">
              Request Booking
            </Button>
        </Link>
      </footer>
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import { ArrowLeft, CreditCard, Banknote, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const paymentAmount = priceParam ? parseInt(priceParam, 10) : 0;

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-20">
        <Link href={`/bus-live-location?price=${paymentAmount}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Payment</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-4 flex justify-between items-center">
            <span className="text-muted-foreground">Amount to Pay</span>
            <span className="text-2xl font-bold text-primary">₦{paymentAmount.toLocaleString()}</span>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="card" className="space-y-4">
              <Label htmlFor="card" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Credit/Debit Card</span>
                </div>
                <RadioGroupItem value="card" id="card" />
              </Label>
              <Label htmlFor="bank" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                <div className="flex items-center gap-4">
                  <Landmark className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Bank Transfer</span>
                </div>
                <RadioGroupItem value="bank" id="bank" />
              </Label>
               <Label htmlFor="ussd" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                <div className="flex items-center gap-4">
                   <Banknote className="h-6 w-6 text-primary" />
                  <span className="font-semibold">USSD</span>
                </div>
                <RadioGroupItem value="ussd" id="ussd" />
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
      </main>

      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Link href={`/booking-successful?price=${paymentAmount}`} className="w-full">
            <Button size="lg" className="w-full h-14 text-lg font-bold">
            Confirm Payment
            </Button>
        </Link>
      </footer>
    </div>
  );
}

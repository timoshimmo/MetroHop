'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookingSuccessfulPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const paymentAmount = priceParam ? parseInt(priceParam, 10) : 0;
  
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  useEffect(() => {
    // Generate a random transaction ID on client-side to avoid hydration mismatch
    setTransactionId(`TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    // Set current date and time on client-side
    setTransactionDate(format(new Date(), "PPP, p"));
  }, []);

  return (
    <div className="flex flex-col h-full bg-primary/5">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline text-primary">Payment Successful!</h1>
            <p className="text-muted-foreground">Your booking has been confirmed.</p>
        </div>

        <Card className="w-full max-w-sm text-left shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Ticket className="h-6 w-6 text-primary"/>
                    E-Ticket / Receipt
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-lg text-primary">₦{paymentAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="space-y-2 pt-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono font-medium">{transactionId}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{transactionDate}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-medium">Credit/Debit Card</span>
                    </div>
                </div>
                <Separator />
                 <Button className="w-full" variant="outline">
                    Download Receipt
                 </Button>
            </CardContent>
        </Card>
      </main>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Link href="/home" className="w-full">
            <Button size="lg" className="w-full h-14 text-lg font-bold">
            Back to Home
            </Button>
        </Link>
      </footer>
    </div>
  );
}

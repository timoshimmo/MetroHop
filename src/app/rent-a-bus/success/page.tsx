
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function RentSuccessPage() {
  return (
    <div className="flex flex-col h-full bg-primary/5">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline text-primary">Booking Request Sent!</h1>
            <p className="text-muted-foreground">We have received your request and will get back to you shortly to confirm availability.</p>
        </div>
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

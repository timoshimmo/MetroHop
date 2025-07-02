'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function SignupPhonePage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/signup">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Create Account</h1>
      </header>
      
      <main className="flex-1 flex flex-col p-6 space-y-6">
        <div className="space-y-2">
            <Progress value={50} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">Step 2 of 4</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-bold font-headline">What's your phone number?</h2>
            <p className="text-muted-foreground">We'll use this for verification and notifications.</p>
        </div>
        
        <form className="flex-1 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" placeholder="+234 801 234 5678" required className="h-12"/>
          </div>
          
          <div className="mt-auto">
            <Link href="/signup/email" className="w-full">
              <Button type="submit" size="lg" className="w-full h-14 text-lg">
                Next
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

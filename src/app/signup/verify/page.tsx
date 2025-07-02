'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function SignupVerifyPage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/signup/email">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Verify Email</h1>
      </header>
      
      <main className="flex-1 flex flex-col p-6 space-y-6">
        <div className="space-y-2">
            <Progress value={100} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">Step 4 of 4</p>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-bold font-headline">Enter Verification Code</h2>
            <p className="text-muted-foreground">
                We've sent a 6-digit code to your email address. Please enter it below.
            </p>
        </div>
        
        <form className="flex-1 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input id="code" type="text" placeholder="123456" required className="h-12 text-center text-2xl tracking-[1em]" maxLength={6} />
          </div>

          <p className="text-center text-sm mt-4">
            Didn't receive a code?{' '}
            <Button variant="link" className="p-0 h-auto">
              Resend Code
            </Button>
          </p>
          
          <div className="mt-auto">
            <Link href="/signup/success" className="w-full">
              <Button type="submit" size="lg" className="w-full h-14 text-lg">
                Verify
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

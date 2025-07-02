'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bus } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
             <div className="inline-block p-3 bg-primary rounded-full">
                <Bus className="h-10 w-10 text-primary-foreground" />
             </div>
            <h1 className="text-3xl font-bold font-headline text-primary">MetroHop</h1>
            <p className="text-muted-foreground">Welcome back! Please login to your account.</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/home" className="w-full">
                <Button type="submit" size="lg" className="w-full h-12 text-lg">
                    Log In
                </Button>
            </Link>
          </form>
          
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

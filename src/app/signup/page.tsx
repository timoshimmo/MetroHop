'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bus } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-3 bg-primary rounded-full">
                <Bus className="h-10 w-10 text-primary-foreground" />
             </div>
            <h1 className="text-3xl font-bold font-headline text-primary">Create an Account</h1>
            <p className="text-muted-foreground">Get started with MetroHop today.</p>
          </div>
          
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <Link href="/home" className="w-full">
              <Button type="submit" size="lg" className="w-full h-12 text-lg pt-2">
                Sign Up
              </Button>
            </Link>
          </form>
          
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

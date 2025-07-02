import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Bell } from 'lucide-react';
import { RouteCard } from '@/components/route-card';
import { recentTrips } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div>
          <h1 className="text-2xl font-bold font-headline text-primary">MetroHop</h1>
          <p className="text-sm text-muted-foreground">Welcome back!</p>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="overflow-hidden shadow-lg">
          <Image
            src="https://placehold.co/600x300.png"
            alt="Bus promotional banner"
            width={600}
            height={300}
            className="w-full object-cover"
            data-ai-hint="bus modern city"
          />
        </Card>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for a location..." className="pl-10 h-12 text-base" />
        </div>

        <section>
          <h2 className="text-xl font-bold font-headline mb-4">Recent Trips</h2>
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <RouteCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

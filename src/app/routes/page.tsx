'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { nigerianCities } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const lowercasedQuery = searchQuery.toLowerCase();

  const filteredCities = nigerianCities.filter(city =>
    city.name.toLowerCase().includes(lowercasedQuery) ||
    city.state.toLowerCase().includes(lowercasedQuery)
  );

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Select a City</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Where to?"
              className="pl-10 h-12 text-base bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        
        <div className="space-y-3">
          {filteredCities.map((city) => (
            <Card key={city.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-headline">{city.name}</h3>
                  <p className="text-sm text-muted-foreground">{city.state} State</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

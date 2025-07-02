'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { allRoutes } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RouteCard } from '@/components/route-card';

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const lowercasedQuery = searchQuery.toLowerCase();

  const filteredRoutes = allRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(lowercasedQuery) ||
      route.from.toLowerCase().includes(lowercasedQuery) ||
      route.to.toLowerCase().includes(lowercasedQuery)
  );

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">Intra-City Routes</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for a city or route"
            className="pl-10 h-12 text-base bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <RouteCard key={route.id} trip={route} />
          ))}
          {filteredRoutes.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">No routes found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

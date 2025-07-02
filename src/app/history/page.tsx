import { RouteCard } from '@/components/route-card';
import { historyTrips } from '@/lib/data';
import { FileText } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">Trip History</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {historyTrips.length > 0 ? (
          <div className="space-y-4">
            {historyTrips.map((trip) => (
              <RouteCard key={trip.id} trip={trip} showStatus={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <FileText className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold font-headline">No Trips Yet</h2>
            <p>Your past trips will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

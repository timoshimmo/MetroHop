
import { CarFront, FileText } from 'lucide-react';

export default function RentalsHistoryPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">Rental History</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <FileText className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-semibold font-headline">No Rentals Yet</h2>
          <p>Your past bus or driver rentals will appear here.</p>
        </div>
      </main>
    </div>
  );
}

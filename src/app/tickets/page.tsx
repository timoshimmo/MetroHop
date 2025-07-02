import { TicketCard } from '@/components/ticket-card';
import { myTickets } from '@/lib/data';
import { Ticket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function TicketsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">My Tickets</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {myTickets.length > 0 ? (
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {myTickets.map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              {myTickets.filter(t => t.status === 'Active' || t.status === 'Upcoming').map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
               {myTickets.filter(t => t.status === 'Completed').map((trip) => (
                <TicketCard key={trip.id} trip={trip} />
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Ticket className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold font-headline">No Tickets Yet</h2>
            <p>Your purchased tickets will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

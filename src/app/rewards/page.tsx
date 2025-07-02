import { Award } from 'lucide-react';

export default function RewardsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">Rewards</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <Award className="w-16 h-16 mb-4 text-primary" />
          <h2 className="text-xl font-semibold font-headline">No Rewards Yet</h2>
          <p>Your rewards and special offers will appear here.</p>
        </div>
      </main>
    </div>
  );
}

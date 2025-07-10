
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, CreditCard, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const recentTransactions = [
    { type: 'Top-up', date: '2024-07-20', amount: 5000, method: 'Credit Card' },
    { type: 'Trip Payment', date: '2024-07-19', amount: -500, method: 'Lekki-Ajah Express' },
    { type: 'Trip Payment', date: '2024-07-18', amount: -300, method: 'Chevron Commute' },
    { type: 'Top-up', date: '2024-07-15', amount: 10000, method: 'Bank Transfer' },
]

export default function WalletPage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold font-headline">My Wallet</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="shadow-md text-center">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-4xl font-bold text-primary mt-1">₦25,000</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">Add Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₦</span>
                    <Input type="number" placeholder="Enter amount" className="pl-8 h-12 text-lg font-bold"/>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">₦1,000</Button>
                    <Button variant="outline" className="flex-1">₦2,000</Button>
                    <Button variant="outline" className="flex-1">₦5,000</Button>
                </div>
                <Button size="lg" className="w-full h-12">
                    <Plus className="mr-2 h-5 w-5" />
                    Proceed to Top-up
                </Button>
            </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-bold font-headline mb-2">Recent Transactions</h2>
          <Card className="shadow-md">
            <CardContent className="p-4 space-y-2">
                {recentTransactions.map((tx, index) => (
                    <React.Fragment key={index}>
                        <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {tx.amount > 0 ? <CreditCard className="h-5 w-5 text-green-600" /> : <Landmark className="h-5 w-5 text-red-600" />}
                                </div>
                                <div>
                                    <p className="font-semibold">{tx.type}</p>
                                    <p className="text-xs text-muted-foreground">{tx.method}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-destructive'}`}>
                                    {tx.amount > 0 ? `+₦${tx.amount.toLocaleString()}` : `-₦${Math.abs(tx.amount).toLocaleString()}`}
                                </p>
                                <p className="text-xs text-muted-foreground">{tx.date}</p>
                            </div>
                        </div>
                        {index < recentTransactions.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

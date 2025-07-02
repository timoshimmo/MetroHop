'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, User, Ticket, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/history', label: 'History', icon: History },
  { href: '/tickets', label: 'My Ticket', icon: Ticket },
  { href: '/rewards', label: 'Rewards', icon: Award },
  { href: '/profile', label: 'Account', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary">
              <item.icon className={cn('h-6 w-6', isActive && 'text-primary')} />
              <span className={cn('text-xs font-medium', isActive && 'text-primary')}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

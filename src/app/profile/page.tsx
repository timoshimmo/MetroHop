import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, User, Settings, Shield, LogOut, CreditCard, Award } from 'lucide-react';

const menuItems = [
  { icon: User, text: 'Edit Profile', href: '#' },
  { icon: CreditCard, text: 'Payment Methods', href: '#' },
  { icon: Award, text: 'Rewards', href: '/rewards' },
  { icon: Settings, text: 'Settings', href: '#' },
  { icon: Shield, text: 'Help & Support', href: '#' },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline text-center">Account</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person portrait" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold font-headline">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
        
        <Card className="shadow-md">
          <CardContent className="p-0">
            <ul className="divide-y">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                    <item.icon className="w-5 h-5 mr-4 text-primary" />
                    <span className="flex-1 font-medium">{item.text}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-6">
          <a href="#" className="flex items-center p-4 hover:bg-muted/50 transition-colors rounded-lg text-destructive">
            <LogOut className="w-5 h-5 mr-4" />
            <span className="flex-1 font-medium">Log Out</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </main>
    </div>
  );
}

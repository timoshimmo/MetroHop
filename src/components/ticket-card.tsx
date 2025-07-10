import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, Bus, Circle, MoreVertical } from 'lucide-react';
import type { Trip } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  trip: Trip;
  showCategory?: boolean;
}

export function TicketCard({ trip, showCategory = true }: TicketCardProps) {
  const getStatusBadge = () => {
    switch (trip.status) {
      case 'Active':
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'Upcoming':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case 'Completed':
         return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge>{trip.status}</Badge>;
    }
  }

   const getCategoryBadge = () => {
    if (!showCategory) return null;
    
    switch (trip.category) {
      case 'Intercity':
        return <Badge variant="outline" className="text-purple-600 border-purple-300">{trip.category}</Badge>;
      case 'Local':
        return <Badge variant="outline" className="text-orange-600 border-orange-300">{trip.category}</Badge>;
      default:
        return null;
    }
  }


  return (
    <Link href={`/bus-live-location?price=${trip.price}`}>
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                  {getStatusBadge()}
                  {getCategoryBadge()}
              </div>
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div>
              <h3 className="font-bold text-lg font-headline">{trip.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Bus className="h-4 w-4" />
                Bus No: {trip.busNumber}
              </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col items-start gap-1">
              <span className="font-semibold">{trip.departureTime}</span>
              <span className="text-muted-foreground truncate max-w-[100px]">{trip.from}</span>
            </div>
            <div className="flex-1 flex items-center text-muted-foreground px-2">
              <Circle className="h-3 w-3 text-primary fill-primary" />
              <Separator className="flex-1" />
              <Clock className="h-4 w-4 text-primary" />
              <Separator className="flex-1" />
              <Circle className="h-3 w-3 text-primary" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-semibold">{trip.arrivalTime}</span>
              <span className="text-muted-foreground truncate max-w-[100px]">{trip.to}</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
              <p className="font-bold text-lg text-primary">₦{trip.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Tap to view details</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

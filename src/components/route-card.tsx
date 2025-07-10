import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bus } from 'lucide-react';
import type { Trip } from '@/lib/types';
import Link from 'next/link';

interface RouteCardProps {
  trip: Trip;
  showStatus?: boolean;
}

export function RouteCard({ trip, showStatus = false }: RouteCardProps) {
  return (
    <Link href={`/routes/${trip.id}`} className="block">
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Bus className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm mb-0 text-muted-foreground">Route</p>
                <h3 className="font-bold text-lg font-headline">{trip.routeNumber || trip.busNumber}</h3>
              </div>
            </div>
            {showStatus && <Badge variant={trip.status === 'Completed' ? 'secondary' : 'default'}>{trip.status}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col items-start gap-1">
              <span className="font-semibold">{trip.departureTime}</span>
              <span className="text-muted-foreground truncate max-w-[100px]">{trip.from}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <div className="w-4 h-4 rounded-full border-2 border-primary" />
              <Separator className="w-12 mx-2" />
              <ArrowRight className="h-4 w-4 text-primary" />
              <Separator className="w-12 mx-2" />
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-semibold">{trip.arrivalTime}</span>
              <span className="text-muted-foreground truncate max-w-[100px]">{trip.to}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
          <p className="font-bold text-lg text-primary">₦{trip.price.toLocaleString()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Route, Clock } from 'lucide-react';
import type { Trip } from '@/lib/types';
import Link from 'next/link';
import { parse, formatDistanceStrict } from 'date-fns';

interface RouteCardProps {
  trip: Trip;
  showStatus?: boolean;
}

export function RouteCard({ trip, showStatus = false }: RouteCardProps) {

  const calculateDuration = (start: string, end: string): string => {
    try {
      // We need a base date to parse times, it can be any date.
      const baseDate = '2024-01-01';
      const startTime = parse(`${baseDate} ${start}`, 'yyyy-MM-dd h:mm a', new Date());
      const endTime = parse(`${baseDate} ${end}`, 'yyyy-MM-dd h:mm a', new Date());

      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
         // Fallback for non-standard time formats like 'Today'
         return '';
      }

      return formatDistanceStrict(endTime, startTime, {
        unit: 'minute',
      }).replace(' minutes', 'm').replace(' minute', 'm').replace(' hours', 'h').replace(' hour', 'h');
    } catch (error) {
      console.error("Error calculating duration:", error);
      return '';
    }
  };

  const duration = calculateDuration(trip.departureTime, trip.arrivalTime);

  return (
    <Link href={`/routes/${trip.id}`} className="block">
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Route className="h-5 w-5 text-muted-foreground" />
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
            <div className="flex flex-col items-start gap-1 w-1/3">
              <span className="font-semibold">{trip.departureTime}</span>
              <span className="text-muted-foreground truncate">{trip.from}</span>
            </div>
            <div className="flex-1 flex flex-col items-center text-muted-foreground">
               {duration && (
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{duration}</span>
                </div>
              )}
              <div className="flex items-center w-full">
                <div className="w-4 h-4 rounded-full border-2 border-primary" />
                <Separator className="flex-1 mx-2" />
                <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                <Separator className="flex-1 mx-2" />
                <div className="w-4 h-4 rounded-full bg-primary" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 w-1/3 text-right">
              <span className="font-semibold">{trip.arrivalTime}</span>
              <span className="text-muted-foreground truncate">{trip.to}</span>
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

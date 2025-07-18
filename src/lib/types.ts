export interface Trip {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  busNumber: string;
  status?: 'Completed' | 'Upcoming' | 'Ongoing' | 'Active';
  category?: 'Intercity' | 'Local';
  seatsAvailable?: number;
  routeNumber?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Stop {
  id: string;
  name: string;
  address: string;
  routes: string[];
  lat?: number;
  lng?: number;
}

export interface Promo {
    id: string;
    title: string;
    description: string;
    iconUrl: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

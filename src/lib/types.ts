export interface Trip {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  busNumber: string;
  status?: 'Completed' | 'Upcoming' | 'Ongoing';
}

export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Stop {
  id: string;
  name: string;
  routes: string[];
}

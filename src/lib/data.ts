import type { Trip, Location, Stop } from './types';

export const recentTrips: Trip[] = [
  {
    id: '1',
    name: 'Downtown Express',
    from: 'Central Station',
    to: 'Uptown Plaza',
    departureTime: '08:00 AM',
    arrivalTime: '08:45 AM',
    price: 3.50,
    busNumber: 'DX-45',
  },
  {
    id: '2',
    name: 'Crosstown 77',
    from: 'Westside Mall',
    to: 'Eastgate Terminal',
    departureTime: '09:15 AM',
    arrivalTime: '10:05 AM',
    price: 4.00,
    busNumber: 'CT-77',
  },
];

export const allRoutes: Trip[] = [
    ...recentTrips,
    {
    id: '3',
    name: 'Lakeview Line',
    from: 'City Hall',
    to: 'North Lake Park',
    departureTime: '11:00 AM',
    arrivalTime: '11:30 AM',
    price: 2.75,
    busNumber: 'LV-12',
  },
  {
    id: '4',
    name: 'Airport Shuttle',
    from: 'Grand Hotel',
    to: 'International Airport',
    departureTime: '12:30 PM',
    arrivalTime: '01:15 PM',
    price: 15.00,
    busNumber: 'AS-01',
  },
   {
    id: '5',
    name: 'Suburb Connect',
    from: 'Green Valley',
    to: 'Downtown Central',
    departureTime: '02:00 PM',
    arrivalTime: '02:50 PM',
    price: 5.20,
    busNumber: 'SC-33',
  },
];

export const historyTrips: Trip[] = [
  {
    id: 'h1',
    name: 'University Route',
    from: 'Oak Street',
    to: 'Main Campus',
    departureTime: 'Yesterday',
    arrivalTime: '10:00 AM',
    price: 2.50,
    busNumber: 'U-101',
    status: 'Completed',
  },
  {
    id: 'h2',
    name: 'Industrial Park',
    from: 'Factory Gate',
    to: 'Central Station',
    departureTime: '2 days ago',
    arrivalTime: '05:30 PM',
    price: 3.00,
    busNumber: 'IP-05',
    status: 'Completed',
  },
];

export const locations: Location[] = [
    { id: 'loc1', name: 'Central Station', address: '123 Main St, Downtown' },
    { id: 'loc2', name: 'Uptown Plaza', address: '456 High Ave, Uptown' },
    { id: 'loc3', name: 'Westside Mall', address: '789 West Blvd, Westside' },
    { id: 'loc4', name: 'International Airport', address: '1 Airport Rd, Airport District' },
];

export const stops: Stop[] = [
    { id: 'stop1', name: 'City Hall Stop', routes: ['DX-45', 'LV-12'] },
    { id: 'stop2', name: 'Oak Street Corner', routes: ['CT-77', 'U-101'] },
    { id: 'stop3', name: 'North Lake Entrance', routes: ['LV-12'] },
    { id: 'stop4', name: 'Grand Hotel Pickup', routes: ['AS-01'] },
];

import type { Trip, Location, Stop } from './types';

export const recentTrips: Trip[] = [
  {
    id: '1',
    name: 'Lekki-Ajah Express',
    from: 'Lekki Phase 1',
    to: 'Ajah Bus Stop',
    departureTime: '08:00 AM',
    arrivalTime: '08:45 AM',
    price: 500,
    busNumber: 'LK-AJ-01',
  },
  {
    id: '2',
    name: 'Chevron Commute',
    from: 'Chevron Drive',
    to: 'Lekki Phase 1',
    departureTime: '09:15 AM',
    arrivalTime: '09:45 AM',
    price: 300,
    busNumber: 'LK-CH-02',
  },
];

export const allRoutes: Trip[] = [
    ...recentTrips,
    {
    id: '3',
    name: 'Ikate Connector',
    from: 'Ikate-Elegushi',
    to: 'VGC',
    departureTime: '11:00 AM',
    arrivalTime: '11:30 AM',
    price: 350,
    busNumber: 'IK-VGC-03',
  },
  {
    id: '4',
    name: 'Ajah Terminus Link',
    from: 'Ajah Bus Stop',
    to: 'Lekki Phase 1',
    departureTime: '12:30 PM',
    arrivalTime: '01:15 PM',
    price: 500,
    busNumber: 'AJ-LK-04',
  },
   {
    id: '5',
    name: 'VGC Shuttle',
    from: 'VGC',
    to: 'Chevron Drive',
    departureTime: '02:00 PM',
    arrivalTime: '02:20 PM',
    price: 200,
    busNumber: 'VGC-CH-05',
  },
];

export const historyTrips: Trip[] = [
  {
    id: 'h1',
    name: 'Morning Rush',
    from: 'Ajah Bus Stop',
    to: 'Lekki Phase 1',
    departureTime: 'Yesterday',
    arrivalTime: '08:00 AM',
    price: 500,
    busNumber: 'AJ-LK-04',
    status: 'Completed',
  },
  {
    id: 'h2',
    name: 'Evening Commute',
    from: 'Ikate-Elegushi',
    to: 'VGC',
    departureTime: '2 days ago',
    arrivalTime: '06:00 PM',
    price: 350,
    busNumber: 'IK-VGC-03',
    status: 'Completed',
  },
];

export const locations: Location[] = [
    { id: 'loc1', name: 'Lekki Phase 1', address: 'Admiralty Way, Lekki' },
    { id: 'loc2', name: 'Ikate-Elegushi', address: 'By Elegushi Beach Road, Lekki' },
    { id: 'loc3', name: 'Chevron Drive', address: 'By Chevron Toll Gate, Lekki' },
    { id: 'loc4', name: 'VGC', address: 'Victoria Garden City, Lekki-Epe Expressway' },
    { id: 'loc5', name: 'Ajah Bus Stop', address: 'Under the Jubilee Bridge, Ajah' },
];

export const stops: Stop[] = [
    { id: 'stop1', name: 'Lekki Phase 1 Gate', routes: ['LK-AJ-01', 'LK-CH-02', 'AJ-LK-04'] },
    { id: 'stop2', name: 'Ikate Junction', routes: ['LK-AJ-01', 'IK-VGC-03'] },
    { id: 'stop3', name: 'Chevron Bus Stop', routes: ['LK-AJ-01', 'LK-CH-02', 'VGC-CH-05'] },
    { id: 'stop4', name: 'VGC Gate', routes: ['IK-VGC-03', 'VGC-CH-05'] },
    { id: 'stop5', name: 'Ajah Terminus', routes: ['LK-AJ-01', 'AJ-LK-04'] },
];

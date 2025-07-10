import type { Trip, Location, Stop, Promo, City } from './types';

export const localRoutes: Trip[] = [
  {
    id: '1',
    name: 'Lekki-Ajah Express',
    from: 'Lekki Phase 1',
    to: 'Ajah Bus Stop',
    departureTime: '08:00 AM',
    arrivalTime: '08:45 AM',
    price: 500,
    busNumber: 'LK-AJ-01',
    category: 'Local'
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
    category: 'Local'
  },
    {
    id: '3',
    name: 'Ikate Connector',
    from: 'Ikate-Elegushi',
    to: 'VGC',
    departureTime: '11:00 AM',
    arrivalTime: '11:30 AM',
    price: 350,
    busNumber: 'IK-VGC-03',
    category: 'Local'
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
    category: 'Local'
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
    category: 'Local'
  },
];


export const allRoutes: Trip[] = [
  {
    id: 'inter1',
    name: 'Lagos-Abuja Express',
    from: 'Lagos',
    to: 'Abuja',
    departureTime: '06:00 AM',
    arrivalTime: '06:00 PM',
    price: 15000,
    busNumber: 'LA-ABJ-01',
    category: 'Intercity'
  },
  {
    id: 'inter2',
    name: 'PH-Enugu Connector',
    from: 'Port Harcourt',
    to: 'Enugu',
    departureTime: '08:00 AM',
    arrivalTime: '12:00 PM',
    price: 8000,
    busNumber: 'PH-EN-01',
    category: 'Intercity'
  },
  {
    id: 'inter3',
    name: 'Kano-Kaduna Shuttle',
    from: 'Kano',
    to: 'Kaduna',
    departureTime: '09:00 AM',
    arrivalTime: '12:00 PM',
    price: 5000,
    busNumber: 'KN-KD-01',
    category: 'Intercity'
  },
  {
    id: 'inter4',
    name: 'Ibadan-Lagos Runner',
    from: 'Ibadan',
    to: 'Lagos',
    departureTime: '10:00 AM',
    arrivalTime: '01:00 PM',
    price: 4500,
    busNumber: 'IB-LA-01',
    category: 'Intercity'
  },
];

export const historyTrips: Trip[] = [
  {
    id: 'h1',
    name: 'Lekki-Ajah Express',
    from: 'Lekki Phase 1',
    to: 'Ajah Bus Stop',
    departureTime: 'Today',
    arrivalTime: '08:45 AM',
    price: 500,
    busNumber: 'LK-AJ-01',
    status: 'Completed',
    category: 'Local'
  },
  {
    id: 'h2',
    name: 'Chevron Commute',
    from: 'Chevron Drive',
    to: 'Lekki Phase 1',
    departureTime: 'Yesterday',
    arrivalTime: '09:45 AM',
    price: 300,
    busNumber: 'LK-CH-02',
    status: 'Completed',
    category: 'Local'
  },
   {
    id: 'h3',
    name: 'VGC Shuttle',
    from: 'VGC',
    to: 'Chevron Drive',
    departureTime: '2 days ago',
    arrivalTime: '02:20 PM',
    price: 200,
    busNumber: 'VGC-CH-05',
    status: 'Completed',
    category: 'Local'
  },
];

export const myTickets: Trip[] = [
  {
    id: 't1',
    name: 'Lekki-Ajah Shuttle',
    from: 'Lekki Phase 1',
    to: 'Ajah Bus Stop',
    departureTime: '06:12',
    arrivalTime: '07:30',
    price: 500,
    busNumber: 'LK-AJ-01',
    status: 'Active',
    category: 'Local'
  },
    {
    id: 't2',
    name: 'God is Good Motors',
    from: 'VGC',
    to: 'Ikeja',
    departureTime: '10:00',
    arrivalTime: '11:30',
    price: 3000,
    busNumber: 'VGC-IK-02',
    status: 'Upcoming',
    category: 'Intercity'
  },
  {
    id: 't3',
    name: 'BRT Lagos',
    from: 'CMS',
    to: 'Ajah',
    departureTime: '14:30',
    arrivalTime: '15:45',
    price: 750,
    busNumber: 'BRT-05',
    status: 'Completed',
    category: 'Local'
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
    { id: 'stop1', name: 'Lekki Phase 1 Gate', routes: ['LK-AJ-01', 'LK-CH-02', 'AJ-LK-04'], lat: 6.447, lng: 3.473 },
    { id: 'stop2', name: 'Ikate Junction', routes: ['LK-AJ-01', 'IK-VGC-03'], lat: 6.43, lng: 3.50 },
    { id: 'stop3', name: 'Chevron Bus Stop', routes: ['LK-AJ-01', 'LK-CH-02', 'VGC-CH-05'], lat: 6.43, lng: 3.52 },
    { id: 'stop4', name: 'VGC Gate', routes: ['IK-VGC-03', 'VGC-CH-05'], lat: 6.44, lng: 3.56 },
    { id: 'stop5', name: 'Ajah Terminus', routes: ['LK-AJ-01', 'AJ-LK-04'], lat: 6.46, lng: 3.59 },
];

export const promos: Promo[] = [
  {
    id: 'p1',
    title: '75% OFF up to 180k',
    description: 'Min spend 50k - BCA Credit Card',
    iconUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'p2',
    title: '50% Cashback',
    description: 'For your first 3 trips',
    iconUrl: 'https://placehold.co/40x40.png',
  },
    {
    id: 'p3',
    title: 'Weekend Bonanza',
    description: 'Flat ₦1000 off on Saturday',
    iconUrl: 'https://placehold.co/40x40.png',
  },
]

export const nigerianCities: City[] = [
  { id: 'city1', name: 'Lagos', state: 'Lagos' },
  { id: 'city2', name: 'Abuja', state: 'FCT' },
  { id: 'city3', name: 'Port Harcourt', state: 'Rivers' },
  { id: 'city4', name: 'Kano', state: 'Kano' },
  { id: 'city5', name: 'Ibadan', state: 'Oyo' },
  { id: 'city6', name: 'Benin City', state: 'Edo' },
  { id: 'city7', name: 'Enugu', state: 'Enugu' },
  { id: 'city8', name: 'Kaduna', state: 'Kaduna' },
  { id: 'city9', name: 'Abeokuta', state: 'Ogun' },
  { id: 'city10', name: 'Onitsha', state: 'Anambra' },
];

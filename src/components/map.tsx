
'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapProps {
  stops: {
    id: string;
    name: string;
    lat?: number;
    lng?: number;
  }[];
  busLocation?: {
    lat: number;
    lng: number;
  };
  onDirectionsChange?: (directions: google.maps.DirectionsResult | null) => void;
}

// IMPORTANT: Replace this with your actual Google Maps API key.
// You can get one from the Google Cloud Console.
const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

export function Map({ stops, busLocation, onDirectionsChange }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['geometry', 'routes'],
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const center = React.useMemo(() => {
    const path = stops
      .filter((stop) => stop.lat && stop.lng)
      .map((stop) => ({ lat: stop.lat!, lng: stop.lng! }));
      
    if (path.length > 0) {
      const avgLat = path.reduce((sum, point) => sum + point.lat, 0) / path.length;
      const avgLng = path.reduce((sum, point) => sum + point.lng, 0) / path.length;
      return { lat: avgLat, lng: avgLng };
    }
    // Default center if no stops or no coords
    return { lat: 6.45, lng: 3.55 };
  }, [stops]);

  useEffect(() => {
    if (!isLoaded || stops.length < 2) return;

    const validStops = stops.filter(stop => stop.lat && stop.lng);
    if (validStops.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: validStops[0].lat!, lng: validStops[0].lng! };
    const destination = { lat: validStops[validStops.length - 1].lat!, lng: validStops[validStops.length - 1].lng! };
    
    const waypoints = validStops.slice(1, -1).map(stop => ({
      location: { lat: stop.lat!, lng: stop.lng! },
      stopover: true,
    }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          const newResult = {
            ...result,
            routes: result.routes.map(route => ({
                ...route,
                duration: route.legs.reduce((total, leg) => total + (leg.duration?.value || 0), 0)
            }))
          };
          setDirections(newResult);
          if (onDirectionsChange) {
            onDirectionsChange(newResult);
          }
        } else {
          console.error(`error fetching directions ${status}`);
           if (onDirectionsChange) {
            onDirectionsChange(null);
          }
        }
      }
    );
  }, [isLoaded, stops, onDirectionsChange]);


  const busIcon = React.useMemo(() => {
    if (!isLoaded) return undefined;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="bus-stop-location">
  <ellipse cx="32" cy="53.5" fill="#fccd1d" rx="29" ry="7.5"></ellipse>
  <ellipse cx="32" cy="53.5" fill="#f9a215" rx="20" ry="3.5"></ellipse>
  <path fill="#dd051d" d="M54 25a22 22 0 1 0-31.14 20l7.82 7.84a2 2 0 0 0 2.64 0L41.14 45A22 22 0 0 0 54 25Z"></path>
  <circle cx="32" cy="25" r="18" fill="#fff"></circle>
  <path fill="#111315" d="M25 34h4v1.27A1.73 1.73 0 0 1 27.27 37h-.54A1.73 1.73 0 0 1 25 35.27V34zm10 0h4v1.27A1.73 1.73 0 0 1 37.27 37h-.54A1.73 1.73 0 0 1 35 35.27V34z"></path>
  <rect width="18" height="21" x="23" y="13" fill="#212529" rx="2.05"></rect>
  <path fill="#fccd1d" d="M41 19h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v-5zm-20 0h2v5h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"></path>
  <path fill="#e6e7e8" d="M23 18h18v7H23z"></path>
  <circle cx="27" cy="30" r="1" fill="#e6e7e8"></circle>
  <circle cx="37" cy="30" r="1" fill="#e6e7e8"></circle>
</svg>
`;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new window.google.maps.Size(48, 48),
      anchor: new window.google.maps.Point(24, 40),
    };
  }, [isLoaded]);


  if (loadError) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-destructive/10 text-destructive">
            <p className="text-center p-4">Error loading map. Please check the API key and internet connection.</p>
        </div>
    );
  }
  
  if (API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            <p className="text-center p-4">Please replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' in <strong>src/components/map.tsx</strong> with your actual Google Maps API key to display the map.</p>
        </div>
    )
  }

  if (!isLoaded) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
            <p>Loading Map...</p>
        </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: 'hsl(173 80% 40%)', // primary color
              strokeOpacity: 0.9,
              strokeWeight: 5,
            },
          }}
        />
      )}
      {stops.map((stop) =>
        stop.lat && stop.lng ? (
          <MarkerF
            key={stop.id}
            position={{ lat: stop.lat, lng: stop.lng }}
            title={stop.name}
             options={{
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: 'hsl(173 70% 50%)',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: 'hsl(210 20% 98%)',
              }
            }}
          />
        ) : null
      )}
      {busLocation && busIcon && (
         <MarkerF
            key="bus-location"
            position={busLocation}
            title="Current Bus Location"
            icon={busIcon}
            zIndex={100}
        />
      )}
    </GoogleMap>
  );
}

// Add a declaration for duration on the DirectionsRoute interface
declare global {
  namespace google.maps {
    interface DirectionsRoute {
      duration?: number;
    }
  }
}


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
}

// IMPORTANT: Replace this with your actual Google Maps API key.
// You can get one from the Google Cloud Console.
const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

export function Map({ stops, busLocation }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['geometry'],
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
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [isLoaded, stops]);


  const busIcon = React.useMemo(() => {
    if (!isLoaded) return undefined;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><path d="M19 18h-3v-4h3z"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
    return {
      url: `data:image/svg+xml;utf8,${encodeURIComponent(
        svg
          .replace('stroke="currentColor"', 'stroke="hsl(173 80% 40%)"')
          .replace('<svg ', '<svg fill="hsl(210 20% 98%)" ')
      )}`,
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 20),
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

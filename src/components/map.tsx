'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

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
}

// IMPORTANT: Replace this with your actual Google Maps API key.
// You can get one from the Google Cloud Console.
const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

export function Map({ stops }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const center = React.useMemo(() => {
    if (stops.length > 0 && stops[0].lat && stops[0].lng) {
      // Center the map around the first stop
      return { lat: stops[0].lat, lng: stops[0].lng };
    }
    // Default center if no stops or no coords
    return { lat: 6.45, lng: 3.55 };
  }, [stops]);

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
      zoom={12}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {stops.map((stop) =>
        stop.lat && stop.lng ? (
          <MarkerF
            key={stop.id}
            position={{ lat: stop.lat, lng: stop.lng }}
            title={stop.name}
          />
        ) : null
      )}
    </GoogleMap>
  );
}

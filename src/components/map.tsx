'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';

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
const API_KEY = 'AIzaSyDdvxkcx9kamfF4kBQmcQfURxO7V_NdhnY';

export function Map({ stops }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const path = React.useMemo(
    () =>
      stops
        .filter((stop) => stop.lat && stop.lng)
        .map((stop) => ({ lat: stop.lat!, lng: stop.lng! })),
    [stops]
  );
  
  const center = React.useMemo(() => {
    if (path.length > 0) {
      const avgLat = path.reduce((sum, point) => sum + point.lat, 0) / path.length;
      const avgLng = path.reduce((sum, point) => sum + point.lng, 0) / path.length;
      return { lat: avgLat, lng: avgLng };
    }
    // Default center if no stops or no coords
    return { lat: 6.45, lng: 3.55 };
  }, [path]);


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
      zoom={13}
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
       {path.length > 1 && (
        <PolylineF
          path={path}
          options={{
            strokeColor: '#20CC8A', // Corresponds to primary color hsl(173, 80%, 40%)
            strokeOpacity: 0.9,
            strokeWeight: 5,
          }}
        />
      )}
    </GoogleMap>
  );
}

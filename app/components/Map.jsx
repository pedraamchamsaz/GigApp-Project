import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ locations, center }) => {
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div className="relative h-96 w-96 rounded-2xl mb-10 border-4 border-cyan-500 overflow-hidden focus:outline-none">
        <GoogleMap
          center={center || { lat: 51.5072178, lng: -0.1275862 }} // London
          zoom={10} 
          mapContainerStyle={{
            height: '100%',
            width: '100%', 
          }}
        >
          {/* Markers or other Google Map components go here */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;

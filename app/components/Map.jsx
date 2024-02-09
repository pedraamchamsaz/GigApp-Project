import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ locations, center }) => {
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div
        style={{
          height: '400px',
          width: '400px', 
          borderRadius: '5%', 
          overflow: 'hidden', 
        }}
      >
        <GoogleMap
          center={center || { lat: 51.5072178, lng: -0.1275862 }} // London
          zoom={10} 
          mapContainerStyle={{
            height: '100%',
            width: '100%', 
          }}
        >
          {/* Display markers for each location */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: typeof location.latitude === 'number' ? location.latitude : 0,
                lng: typeof location.longitude === 'number' ? location.longitude : 0,
              }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;

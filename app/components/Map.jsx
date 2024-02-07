// components/GoogleMap.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ locations }) => {
  // You can obtain your Google Maps API key from the Google Cloud Console
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div
        style={{
          height: '400px',
          width: '400px', // Set the width to be equal to the height for a circular shape
          borderRadius: '50%', // Set border-radius to 50% for a circular shape
          overflow: 'hidden', // Hide overflow to maintain circular shape
        }}
      >
        <GoogleMap
          center={{ lat: 0, lng: 0 }} // Default center, will be updated based on user's location or search results
          zoom={10} // Default zoom level, adjust as needed
          mapContainerStyle={{
            height: '100%',
            width: '100%', // Set the width to 100% for full coverage within the circular container
          }}
        >
          {/* Display markers for each location */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
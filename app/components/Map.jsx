import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ locations, center, markerLocations }) => {
  
  const apiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';

  // setMarkers(markerLocations)
  // console.log(markers)

  return (
    <LoadScript googleMapsApiKey={apiKey} markerLocations={markerLocations}>
      <div className="relative h-96 w-96 rounded-2xl mb-10 border-4 border-cyan-500 overflow-hidden focus:outline-none">
        <GoogleMap
          center={center || { lat: 51.5072178, lng: -0.1275862 }} // London
          zoom={10} 
          mapContainerStyle={{
            height: '100%',
            width: '100%', 
          }}
        >
          {/* Display markers for each location */}
          {markerLocations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude)
              }}
              title='hello'
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;

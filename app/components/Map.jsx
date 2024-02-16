import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';

const GoogleMapComponent = ({ center, markerLocations, onMarkerClick, eventData }) => {
  const apiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';
  const [selectedMarker, setSelectedMarker] = useState(null);

  const customMarkerImage = 'assets/images/Logoblack.png';

  const mapOptions = {
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }], 
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#000000' }], 
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }], 
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#000000' }], 
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#00008B' }], 
      },
    ],
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div className="relative h-96 w-96 rounded-3xl mb-10 border-4 border-black overflow-hidden focus:outline-none">
        <GoogleMap
          center={center || { lat: 51.5072178, lng: -0.1275862 }} // London
          zoom={11} 
          mapContainerStyle={{
            height: '100%',
            width: '100%', 
          }}
          options={mapOptions}
        >
          {/* Display markers for each location */}
          {markerLocations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude)
              }}
              title={eventData[index].name}
              onClick={() => {
                setSelectedMarker(index);
                onMarkerClick(index);
              }}
              icon={{
                url: customMarkerImage,
                scaledSize: new window.google.maps.Size(30, 40) // Adjust the size as needed
              }}
            >
              {/* Display InfoWindow when marker is selected */}
              {selectedMarker === index && (
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className='text-white bg-black w-full h-full p-3 rounded border-2 border-cyan-500 overflow-hidden focus:outline-none'>
                <p className='text-lg'><b>{eventData[index].name}</b></p>
                <p className='font-mono'>{eventData[index].dates.start.localDate}</p>
                <p>{eventData[index]._embedded.venues[0].name}</p>
                <br />
                <p className='text-cyan-500'><i>Link to Card...</i></p>
              </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;

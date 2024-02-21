import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import CardExpanded from './CardExpanded'

const GoogleMapComponent = ({ center, markerLocations, onMarkerClick, eventData, open, stateEvent, setStateEvent, stateImg,setStateImg, setOpen, handleClickOpen, handleClose, customMarkerImage, mapOptions, handleMarkerClick, handleMapClick, selectedMarker, setSelectedMarker, markerLocationsUser }) => {
  const apiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';

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
          onClick={handleMapClick}
        >
          {/* Display markers for each location */}
          {markerLocations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude)
              }}
              title={eventData[index]?.name}
              onClick={() => {
                setSelectedMarker(index);
                onMarkerClick(index);
                handleMarkerClick(index);
              }}
              icon={{
                url: customMarkerImage,
                scaledSize: new window.google.maps.Size(30, 40) 
              }}
            >
              {/* Display InfoWindow when marker is selected */}
              {selectedMarker === index && (
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className='text-center w-full h-full p-3 rounded' style={{ background: `url(${stateImg}) center/cover no-repeat` }}>
                    <div className='bg-black/50 rounded hover:bg-black/80 p-2'>
                <p className='text-lg text-white shadow-md'><b>{eventData[index].name}</b></p>
                <p className='font-mono text-white shadow-md'>{eventData[index].dates.start.localDate}</p>
                <p className='text-white shadow-md mt-1'>{eventData[index]._embedded.venues[0].name}</p>
                <div>
                  <br />
                <p
        className='text-cyan-500 cursor-pointer'
        onClick={() => handleClickOpen(eventData[index])}
      >
        <i>More details...</i></p>
                  <CardExpanded 
              open={open}
              handleClose={handleClose}
              eventData={eventData}
              event={stateEvent}
              img={stateImg}
              />
                  </div>
                  </div>
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

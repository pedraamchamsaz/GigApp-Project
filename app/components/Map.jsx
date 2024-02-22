import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import CardExpanded from './CardExpanded'
import EventUserCardExpanded from './EventUserCardExpanded';

const GoogleMapComponent = ({ center, markerLocations, userMarkerLocations, onMarkerClick, eventData, open, stateEvent, setStateEvent, stateImg,setStateImg, setOpen, location, currentCoords, userGigRadius}) => {
  const apiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (selectedMarker !== null) {
      const filteredImages = eventData[selectedMarker].images.filter((image) => image.height === 1152);
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
  }, [stateImg, selectedMarker, eventData]);

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

  const handleClose = () => {
    console.log("this is being clicked")
    setStateEvent('')
    setOpen(false);
  };

  const handleClickOpen = (eventPassedIn) => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(eventPassedIn)

    const filteredImages = eventPassedIn.images.filter(image => image.height === 1152);
    const img = filteredImages.length > 0 && filteredImages[0].url;
    setStateImg(img)
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
    onMarkerClick(index);

    // Update stateImg based on the selected marker
    const filteredImages = eventData[index].images.filter((image) => image.height === 1152);
    const img = filteredImages.length > 0 && filteredImages[0].url;
    setStateImg(img);
  };

  const handleMapClick = () => {
    if (selectedMarker !== null) {
      // Close InfoWindow when clicking outside
      setSelectedMarker(null);
    }
  };

  function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    const R = 3963.19; // Radius of the earth in miles
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

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
              title={eventData[index].name}
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

{/* Display markers for each User Event location */}
{userMarkerLocations?.filter(mark => getDistanceFromLatLon(currentCoords?.latitude, currentCoords?.longitude, mark.latitude, mark.longitude) <= userGigRadius).map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude)
              }}
              title={userMarkerLocations.name}
              onClick={() => {
                setSelectedMarker(index);
                onMarkerClick(index);
                handleMarkerClick(index);
              }}
              icon={{
                url: customMarkerImage,
                scaledSize: new window.google.maps.Size(25, 35) 
              }}
            >
              {/* Display InfoWindow when marker is selected */}
              {selectedMarker === index && (
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className='text-center w-full h-full p-3 rounded' style={{ background: `url(${userMarkerLocations.photo}) center/cover no-repeat` }}>
                    <div className='bg-black/50 rounded hover:bg-black/80 p-2'>
                <p className='text-lg text-white shadow-md'><b>{userMarkerLocations.name}</b></p>
                <p className='font-mono text-white shadow-md'>{userMarkerLocations.date}</p>
                <p className='text-white shadow-md mt-1'>{userMarkerLocations.venue}</p>
                <div>
                  <br />
                <p
        className='text-cyan-500 cursor-pointer'
        onClick={() => handleClickOpen()}
      >
        <i>More details...</i></p>
        {/* <EventUserCardExpanded
        open={open}
        handleClose={handleClose}
        {...props}
        event={stateEvent}
        img={stateImg}
      /> */}
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
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import CardExpanded from '../Card/CardExpanded'

const GoogleMapComponent = ({ getDistanceFromLatLon, results, allEvents, radius, currentCoords, center, onMarkerClick, eventData, open, stateEvent, setStateEvent, userStateEvent, stateImg, setStateImg, setOpen}) => {
  const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedUserMarker, setSelectedUserMarker] = useState(null);
  const [showMapExpandedCard, setShowMapExpandedCard] = useState(false);

  useEffect(() => {
    if (selectedMarker !== null && allEvents[selectedMarker]) {
      const filteredImages = allEvents[selectedMarker].images?.filter((image) => image.height === 1152) || [];
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
  }, [selectedMarker, allEvents]);

  useEffect(() => { 
    console.log(userStateEvent)
  }, [userStateEvent])
  

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
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#000000' }], 
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#ffffff' }], 
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#006666' }], 
      },
      {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [{ color: '#B0D8D8' }], 
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [{ color: '#8AB9BF' }], 
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

    const filteredImages = eventPassedIn.images?.filter(image => image.height === 1152);
    const img = filteredImages?.length > 0 && filteredImages[0].url;
    setStateImg(img)
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
    onMarkerClick(index);

    // Update stateImg based on the selected marker
    const filteredImages = allEvents[index].images?.filter((image) => image.height === 1152);
    const img = filteredImages?.length > 0 && filteredImages[0].url;
    setStateImg(img);
  };

  const handleUserMarkerClick = (index) => {
    setSelectedUserMarker(index);
    setShowMapExpandedCard(false); // Hide the full-screen card when user marker is clicked
  };

  const handleMapClick = () => {
    if (selectedMarker || selectedUserMarker !== null) {
      // Close InfoWindow when clicking outside
      setSelectedMarker(null);
      setSelectedUserMarker(null);
    }
  };

  const handleMoreDetailsClick = () => {
    setShowMapExpandedCard(true);
  };

  return (
    <LoadScript googleMapsApiKey={GoogleapiKey}>
      <div className="relative rounded-3xl mb-10 border-black overflow-hidden focus:outline-none w-full">
        <GoogleMap
          center={center || { lat: 51.5072178, lng: -0.1275862 }} // London
          zoom={10} 
          mapContainerStyle={{
            height: '70vh',
            width: '95vw', 
          }}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {/* Display markers for each location */}
          {allEvents.filter(mark => getDistanceFromLatLon(currentCoords?.latitude, currentCoords?.longitude, mark.latitude, mark.longitude) <= radius).slice(0, results).map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude)
              }}
              title={allEvents[index]?.name}
              onClick={() => {
                setSelectedMarker(index);
                onMarkerClick(index);
                handleMarkerClick(index);
              }}
              icon={{
                url: customMarkerImage,
                scaledSize: new window.google.maps.Size(40, 50) 
              }}
            >
              {/* Display InfoWindow when marker is selected */}
              {selectedMarker === index && (
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className='text-center w-full h-full p-3 rounded' style={{ background: `url(${stateImg}) center/cover no-repeat` }}>
                    <div className='bg-black/50 rounded hover:bg-black/80 p-2'>
                <p className='text-lg text-white shadow-md'><b>{allEvents[index].name}</b></p>
                <p className='font-mono text-white shadow-md'>{allEvents[index].date}</p>
                <p className='text-white shadow-md mt-1'>{allEvents[index].venue}</p>
                <div>
                  <br />
                <p
        className='text-cyan-500 cursor-pointer'
        onClick={() => handleClickOpen(allEvents[index])}
      >
        <i>More details...</i></p>
            <CardExpanded 
              open={open}
              handleClose={handleClose}
              // eventData={eventData}
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
import { useState, useEffect } from 'react';
import GoogleMap from './Map';

const SearchBar = ({ city, setCity, googleMapsResults, handleSearch, center, handleCurrentLocation, markerLocations, setSelectedCard, eventData, open, stateEvent, setStateEvent, stateImg, setStateImg, setOpen, handleClickOpen, handleClose, customMarkerImage, mapOptions, handleMarkerClick, handleMapClick, selectedMarker, setSelectedMarker}) => {

  useEffect(() => {
    const handleCurrentLocationOnLoad = () => {
      // Click current location button on page load
      document.getElementById('currentLocationButton').click();
    };

    handleCurrentLocationOnLoad();
  }, []); 


  // const handleMarkerClick = (index) => {
  //   // Pass the selected card information to the parent component
  //   if (markerLocations[index]) {
  //     setSelectedCard(markerLocations[index]);
  //   }
  // };

  return (

    <div className='flex flex-col items-center justify-center'>

      <form onSubmit={handleSearch} className='text-center mb-4'>
        <div className='flex items-center'>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='p-2 rounded-l-full border-t-4 border-b-4 border-l-4 border-solid border-teal-500 focus:outline-none'
          />
          <button type="submit" className='bg-green-500 text-white p-2 rounded-r-full ml-0 border-t-4 border-b-4 border-r-4 border-solid border-teal-500 focus:outline-none' title='Search for Gigs'>Go</button>
        </div>
      </form>



      <button id="currentLocationButton" onClick={handleCurrentLocation} className='bg-black p-2 rounded-full border-2 border-solid border-teal-500 focus:outline-none' title='Use Current Location'>
        <img src='assets/images/Logowhite.png' alt="Logo" className="w-5 h-6" />

      </button>

      <div className='mt-4'>
        <GoogleMap 
          locations={googleMapsResults} 
          center={center} 
          markerLocations={markerLocations}
          onMarkerClick={handleMarkerClick} // Pass the callback to handle marker clicks
          eventData={eventData}
          open={open}
          setOpen={setOpen}
          stateEvent={stateEvent}
          setStateEvent={setStateEvent}
          stateImg={stateImg}
          setStateImg={setStateImg}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          customMarkerImage={customMarkerImage}
          mapOptions={mapOptions}
          handleMarkerClick={handleMarkerClick}
          handleMapClick={handleMapClick}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />
      </div>
    </div>
  );
};

export default SearchBar;

"use client";
import { useEffect } from 'react';
import GoogleMap from './Map';

const SearchBar = ({ city, setCity, googleMapsResults, center, handleCurrentLocation, markerLocations, userMarkerLocations, setUserMarkerLocations, setSelectedCard, eventData, open, userOpen, stateEvent, setStateEvent, userStateEvent, setUserStateEvent, stateImg, setStateImg, setOpen, setUserOpen, location, currentCoords, userGigRadius, search, selectedMarker, setSelectedMarker}) => {
// const SearchBar = ({ city, setCity, googleMapsResults, center, handleCurrentLocation, markerLocations, userMarkerLocations, setUserMarkerLocations, setSelectedCard, eventData, open, stateEvent, setStateEvent, stateImg, setStateImg, setOpen, location, currentCoords, userGigRadius, search, selectedMarker, setSelectedMarker}) => {
// >>>>>>> Development

  useEffect(() => {
    const handleCurrentLocationOnLoad = () => {
      // Click current location button on page load
      document.getElementById('currentLocationButton').click();
    };

    handleCurrentLocationOnLoad();
  }, []); 


  const handleMarkerClick = (index) => {
    if (markerLocations[index]) {
      setSelectedCard(markerLocations[index]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await search(city);
  };

  return (

    <div className='flex flex-col items-center justify-center mt-10'>

      <form onSubmit={handleSearch} className='text-center mb-4'>
        <div className='flex items-center'>
          <input
            type="text"
            placeholder="Please enter your location"
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
          setUserOpen={setUserOpen}
          userOpen={userOpen}
          setOpen={setOpen}
            stateEvent={stateEvent}
            setStateEvent={setStateEvent}
            userStateEvent={userStateEvent}
            setUserStateEvent={setUserStateEvent}
            stateImg={stateImg}
            setStateImg={setStateImg}
            userMarkerLocations={userMarkerLocations} 
      setUserMarkerLocations={setUserMarkerLocations}
      location={location}
      currentCoords={currentCoords}
      userGigRadius={userGigRadius}
      selectedMarker={selectedMarker}
      setSelectedMarker={setSelectedMarker}
        />
      </div>
      <p className='text-cyan-500 text-center'>Click the map markers or scroll down for more...</p>
    </div>
  );
};

export default SearchBar;

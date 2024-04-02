"use client";
import { useEffect } from 'react';
import GoogleMap from './Map';

const SearchBar = ({ results, city, setCity, handleCurrentLocation, markerLocations, setSelectedCard, search, googleMapsResults, ...props}) => {

  useEffect(() => {
    const handleCurrentLocationOnLoad = () => {
      // Click current location button on page load
      document.getElementById('currentLocationButton').click();
    };

    handleCurrentLocationOnLoad();
  }, []); 


  const handleMarkerClick = (index) => {
    if (props.allEvents[index]) {
      setSelectedCard(props.allEvents[index]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await search(city);
  };

  return (

    <div className='flex flex-col items-center justify-center'>

      <div className='flex gap-10'>
        <form onSubmit={handleSearch} className='text-center mb-4'>
          <div className='flex items-center'>
            <input
              type="text"
              placeholder="Enter your location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='p-2 rounded-l-full border-t-4 border-b-4 border-l-4 border-solid border-teal-500 focus:outline-none'
            />
            <button type="submit" className='bg-green-500 text-white p-2 rounded-r-full ml-0 border-t-4 border-b-4 border-r-4 border-solid border-teal-500 focus:outline-none' title='Search for Gigs'>Go</button>
          </div>
        </form>

        <button id="currentLocationButton" onClick={handleCurrentLocation} className='w-12 h-12 bg-black p-2 rounded-full border-2 border-solid border-teal-500 focus:outline-none' title='Use Current Location'>
          <img src='assets/images/pin.png' alt="Logo" className="w-5 h-7 mx-auto" />
        </button>
      </div>

      <div className='mt-4'>
        <GoogleMap  
          {...props}
          onMarkerClick={handleMarkerClick} // Pass the callback to handle marker clicks
        />
      </div>
    </div>
  );
};

export default SearchBar;

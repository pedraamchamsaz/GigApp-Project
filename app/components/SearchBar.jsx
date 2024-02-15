import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './Map';

const SearchBar = ({city, setCity, setLocation, getEventData, googleMapsResults, setGoogleMapsResults, search, handleSearch, center, handleCurrentLocation, markerLocations}) => {

  const [ticketmasterResults, setTicketmasterResults] = useState([]);


  return (

   

    <div className='bg-black flex flex-col items-center justify-center'>

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

      <button onClick={handleCurrentLocation} className='bg-black p-2 rounded-full border-4 border-solid border-teal-500 focus:outline-none' title='Use Current Location'>
        <img src='/images/Logo white.png' alt="Logo" className="w-5 h-6" />
      </button>

      <div className='mt-4'>
        <GoogleMap 
          locations={googleMapsResults} 
          center={center} 
          markerLocations={markerLocations}
          />
      </div>
    </div>
  );
};

export default SearchBar;

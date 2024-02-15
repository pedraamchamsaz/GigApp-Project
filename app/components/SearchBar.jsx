import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './Map';

const SearchBar = ({city, setCity, setLocation, getEventData, googleMapsResults, setGoogleMapsResults, search, handleSearch, center, handleCurrentLocation, markerLocations}) => {

  const [ticketmasterResults, setTicketmasterResults] = useState([]);

  return (
    <div className='bg-white h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleSearch} className='text-center mb-4'>
        <div className='flex items-center'>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='p-2 rounded-l-full border-4 border-solid border-teal-500 focus:outline-none'
          />
          <button type="submit" className='bg-green-500 text-white p-2 rounded-r-full ml-0 border-4 border-solid border-teal-500 focus:outline-none'>Search</button>
        </div>
      </form>

      <button onClick={handleCurrentLocation} className='bg-blue-500 text-white p-2 rounded-md mb-2'>Use Current Location</button>

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
import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './Map';

const SearchBar = ({city, setCity, setLocation, getEventData, googleMapsResults, setGoogleMapsResults, search, handleSearch, center}) => {
  // const [city, setCity] = useState('');
  // const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [ticketmasterResults, setTicketmasterResults] = useState([]);
  // const [mapCenter, setMapCenter] = useState(null);

  // const TMapiKey = 'dKxsi9vgsD7XZlAvArfdQv46MgJABpNm';
  // const GoogleapiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   await search(city);
  //   // console.log(googleMapsResults, 'GOOGLE')
  //   // await setLocation(city)
  //   // getEventData()
  // };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const { latitude, longitude } = position.coords;
  
        const googleMapsResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleapiKey}`
        );
  
        if (googleMapsResponse.data.results && googleMapsResponse.data.results.length > 0) {
          const addressComponents = googleMapsResponse.data.results[0].address_components;
  
          // Log the entire geolocation response for inspection
          console.log('Geolocation response:', googleMapsResponse.data);
  
          // Find the city in the address components
          const cityComponent = addressComponents.find(
            (component) =>
              component.types.includes('locality') ||
              component.types.includes('postal_town') ||
              component.types.includes('administrative_area_level_2')
          );
  
          if (cityComponent) {
            const formattedAddress = cityComponent.long_name;
            setCity(formattedAddress); // Update the city state
            setGoogleMapsResults(googleMapsResponse.data.results);
  
            // Trigger the search function with the closest city
            await search(formattedAddress);
          } else {
            console.error('No specific city component found in geolocation response.');
          }
        } else {
          console.error('No results found for geolocation.');
        }
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };


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
        <GoogleMap locations={googleMapsResults} center={center} />
      </div>
    </div>
  );
};

export default SearchBar;
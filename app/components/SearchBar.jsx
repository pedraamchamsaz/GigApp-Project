import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './Map';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    await search(city);
  };

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

  const search = async (city) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GoogleapiKey}`
      );
      setGoogleMapsResults(googleMapsResponse.data.results);

      if (googleMapsResponse.data.results.length > 0) {
        const userLocation = googleMapsResponse.data.results[0].geometry.location;

        if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number') {
          setMapCenter(userLocation);
        } else {
          console.error('Invalid user location:', userLocation);
        }

        // Code related to Ticketmaster removed
      } else {
        console.error('No results found for the city:', city);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
        <GoogleMap locations={googleMapsResults} center={mapCenter} />
      </div>
    </div>
  );
};

export default SearchBar;

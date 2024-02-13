import { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './Map';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [ticketmasterResults, setTicketmasterResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  const TMapiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
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

        const ticketmasterResponse = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TMapiKey}&city=${city}&classificationName=music`
        );

        if (ticketmasterResponse.data._embedded && ticketmasterResponse.data._embedded.events) {
          const sortedEvents = ticketmasterResponse.data._embedded.events
            .filter(event => event.classifications.some(classification => classification.segment.name === 'Music'))
            .sort((event1, event2) => {
              const venueLocation1 = event1._embedded.venues[0]?.location;
              const venueLocation2 = event2._embedded.venues[0]?.location;

              if (venueLocation1 && venueLocation2) {
                const distance1 = calculateDistance(userLocation.lat, userLocation.lng, venueLocation1.latitude, venueLocation1.longitude);
                const distance2 = calculateDistance(userLocation.lat, userLocation.lng, venueLocation2.latitude, venueLocation2.longitude);

                return distance1 - distance2;
              }

              return 0;
            });

          const closestEvents = sortedEvents.slice(0, 9);
          setTicketmasterResults(closestEvents);
          console.log('Google Maps Results:', googleMapsResponse.data.results);
          console.log('Ticketmaster Music Events:', closestEvents);
        } else {
          console.error('No music events found for the city:', city);
        }
      } else {
        console.error('No results found for the city:', city);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    // Convert distance to miles
    return distance * 0.621371;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div className=' h-screen flex flex-col items-center justify-center'>
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
        <GoogleMap locations={googleMapsResults} center={mapCenter} />
      </div>
    </div>
  );
};

export default SearchBar;
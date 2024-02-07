import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [ticketmasterResults, setTicketmasterResults] = useState([]);
  const GOOGLE_MAPS_API_KEY = null;

  const handleSearch = async (e) => {
    e.preventDefault();
    await search(city);
  };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const googleMapsResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
  
            // Update the city state with the formatted address
            const formattedAddress = googleMapsResponse.data.results[0].formatted_address;
            setCity(formattedAddress.split(',')[0]); // Extracting the city from the formatted address
  
            // Update the googleMapsResults state with the entire location data
            setGoogleMapsResults(googleMapsResponse.data.results);
  
            const ticketmasterResponse = await axios.get(
              `https://app.ticketmaster.com/discovery/v2/events.json?apikey=YOUR_TICKETMASTER_API_KEY&latlong=${latitude},${longitude}`
            );
            setTicketmasterResults(ticketmasterResponse.data._embedded.events);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };  

  const search = async (city) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=GOOGLE_MAPS_API_KEY`
      );
      setGoogleMapsResults(googleMapsResponse.data.results);

      const ticketmasterResponse = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=YOUR_TICKETMASTER_API_KEY&city=${city}`
      );
      setTicketmasterResults(ticketmasterResponse.data._embedded.events);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // You can add additional logic here if needed when 'city' state changes
  }, [city]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={handleCurrentLocation}>Use Current Location</button>

      {/* Display Google Maps and Ticketmaster results */}
      <div>
        <h2>Google Maps Results</h2>
        <pre>{JSON.stringify(googleMapsResults, null, 2)}</pre>
      </div>

      <div>
        <h2>Ticketmaster Results</h2>
        <pre>{JSON.stringify(ticketmasterResults, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SearchBar;

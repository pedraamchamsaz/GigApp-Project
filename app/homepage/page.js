"use client";

import { useEffect, useState } from "react";
import { ApiClient } from "@/apiClient";
import SearchBar from "../components/Map/SearchBar";
import ProfileButton from "../components/Buttons/ProfileButton";
import Geohash from 'latlon-geohash';
import axios from 'axios'
import Dropdown from "../components/Filters/Dropdown";
import RefineButton from "../components/Filters/RefineButton";
import Card from "../components/Card/Card";
import InterestedEvents from "../components/Buttons/Interested";


export default function HomePage(props) {
  const [token, setToken] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [radius, setRadius] = useState(10)
  const [location, setLocation] = useState(null)
  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('')
  const [userStateEvent, setUserStateEvent] = useState('')
  const [stateImg, setStateImg] = useState('')
  const [results, setResults] = useState(15)
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [list, setList] = useState('RECOMMENDED GIGS')
  const [resultsUser, setResultsUser] = useState(45)
  const [currentCoords, setCurrentCoords] = useState(null)

  const [events, setEvents] = useState([]);
  // const [current, setCurrent] = useState(undefined);
  const [allEvents, setAllEvents] = useState([]);
  const [allMarkerLocations, setAllMarkerLocations] = useState([])
  const [finalUserEvents, setFinalUserEvents] = useState([])

  // DATE FUNCTIONS
  const date = new Date()
  const today = date.toISOString().slice(0, 10)
  const date2 = new Date(date.setDate(date.getDate() + 7))
  const todayPlusSeven = date2.toISOString().slice(0, 10)
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(todayPlusSeven)
  const startDateString = `${startDate}T00:00:00Z`
  const endDateString = `${endDate}T23:59:59Z`
  const [startDateUser, setStartDateUser] = useState(today)
  const [endDateUser, setEndDateUser] = useState(todayPlusSeven)
  
  // API KEYS
  const TMapiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
  const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    

  const client = new ApiClient(
    () => token,
    () => logout()
  );


  // FILTERS - RADIUS, DATE
  useEffect(() => {
    getEventData(location)
  }, [results, radius, startDate, endDate])

  // GETS CURRENT POSITION
  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentCoords(position.coords)
        })
      }
      console.log(currentCoords, 'CURRENT COORDS')
    }
  currentLocation()
  }, [])

  // CONVERTS CURRENT COORDS INTO GEOHASH AND GETS TM DATA
  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          const geoHash = Geohash.encode(latitude, longitude, 8)
          setLocation(geoHash)
          getEventData(location)
        })
      }
    }

  currentLocation()

  }, [])

  // TM API CALL
  const getEventData = async (location) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TMapiKey}&classificationName=music&geoPoint=${location}&radius=${radius}&sort=distance,asc&size=200&startDateTime=${startDateString}&endDateTime=${endDateString}`)
      const onSale = response.data._embedded.events.filter(event => event.dates.status.code === 'onsale')
      const sortedOnSale = onSale.sort((a, b) => Date.parse(a.dates.start.localDate) - Date.parse(b.dates.start.localDate));

      // setEventData(sortedOnSale)

      const subset = ['name', '_embedded.venues.0.city', 'dates.start.localDate', 'dates.start.localTime','images', 'url', '_embedded.venues.0.name', '_embedded.venues.0.country.countryCode', '_embedded.venues.0.postalCode', 'priceRanges.0.min', 'priceRanges.0.max', 'priceRanges.0.currency', '_embedded.venues.0.location', '_embedded.venues.0.name']

      const propertyMapping = {
        "name": "name",
        "_embedded.venues.0.city": "city", 
        "dates.start.localDate": "date", 
        "dates.start.localTime": "time",
        "images": "images", 
        "url": "ticketlink", 
        "_embedded.venues.0.name": "venue", 
        "_embedded.venues.0.country.countryCode": "countrycode", 
        "_embedded.venues.0.postalCode": "postcode", 
        "priceRanges.0.min": "price", 
        "priceRanges.0.max": "price2", 
        "priceRanges.0.currency": "currency", 
        "_embedded.venues.0.location": "location",
        "_embedded.venues.0.location.latitude": "latitude",
        "_embedded.venues.0.location.longitude": "longitude",
      };
      
      // Use map() to create a new array with custom property names
      const newArray = sortedOnSale.map(event => {
        const newObj = {};
        for (let prop in propertyMapping) {
          // If the property is nested, access the nested property using dot notation
          if (prop.includes('.')) {
            const nestedProps = prop.split('.');
            let nestedValue = event;
            nestedProps.forEach(nestedProp => {
              if (nestedValue && nestedValue.hasOwnProperty(nestedProp)) {
                nestedValue = nestedValue[nestedProp];
              } else {
                nestedValue = null;
              }
            });
            newObj[propertyMapping[prop]] = nestedValue;
          } else {
            // If the property is not nested, directly assign it to the custom property name
            if (event && event.hasOwnProperty(prop)) {
              newObj[propertyMapping[prop]] = event[prop];
            }
          }
        }
        return newObj;
      });
      console.log(newArray, 'FILTERED')
      setEventData(newArray)

    } catch (e) {
      console.log(e, "ERROR")
    }
  }

  // BACKEND API CALL
  useEffect(() => {
    client
      .getAllEvents()
      .then((response) => {
        const filteredDates = response.data.filter(event => event.date > today)
        setEvents(filteredDates);
      })
      .catch((err) => {
        console.log("failed to get API request (GET)");
      });
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } // if !token, redirect to landing page
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (selectedMarker !== null) {
      const filteredImages = allEvents[selectedMarker].images.filter((image) => image.height === 1152);
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
  }, [allEvents]);

  const search = async (city) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GoogleapiKey}`
      );
      console.log(googleMapsResponse.data.results, 'GOOGLE')
      setGoogleMapsResults(googleMapsResponse.data.results);
  
      if (googleMapsResponse.data.results.length > 0) {
        const userLocation = googleMapsResponse.data.results[0].geometry.location;
        const { lat, lng } = userLocation;
        const latitude = lat
        const longitude = lng
        const geoHash = Geohash.encode(lat, lng, 8);
        setCurrentCoords({latitude: latitude, longitude: longitude})
        setLocation(geoHash);
        getEventData(geoHash);
  
        if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number') {
          setMapCenter(userLocation);
        } else {
          console.error('Invalid user location:', userLocation);
        }
      } else {
        console.error('No results found for the city:', city);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const {latitude, longitude} = position.coords;
  
        const googleMapsResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleapiKey}`
        );

        // setGoogleMapsResults(googleMapsResponse.data.results);

        if (googleMapsResponse.data.results.length > 0) {
          const userLocation = googleMapsResponse.data.results[0].geometry.location;
          const { lat, lng } = userLocation;
          const latitude = lat
          const longitude = lng
          const geoHash = Geohash.encode(lat, lng, 8);
          setCurrentCoords({latitude: latitude, longitude: longitude})
          setLocation(geoHash);
          getEventData(geoHash);
    
          if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number') {
            setMapCenter(userLocation);
          } else {
            console.error('Invalid user location:', userLocation);
          }
        } else {
          console.error('No results found for the city:', city);
        }
  
        // if (googleMapsResponse.data.results && googleMapsResponse.data.results.length > 0) {
        //   const addressComponents = googleMapsResponse.data.results[0].address_components;
  
        //   // Log the entire geolocation response for inspection
        //   console.log('Geolocation response:', googleMapsResponse.data);
  
        //   // Find the city in the address components
        //   const cityComponent = addressComponents.find(
        //     (component) =>
        //       component.types.includes('locality') ||
        //       component.types.includes('postal_town') ||
        //       component.types.includes('administrative_area_level_2')
        //   );
  
        //   if (cityComponent) {
        //     const formattedAddress = cityComponent.long_name;
        //     setCity(formattedAddress); // Update the city state
        //     setGoogleMapsResults(googleMapsResponse.data.results);
  
        //     // Trigger the search function with the closest city
        //     await search(formattedAddress);
        //   } else {
        //     console.error('No specific city component found in geolocation response.');
        //   }
        // } else {
        //   console.error('No results found for geolocation.');
        // }
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    // } else {
    //   console.error('Geolocation is not supported by your browser');
    }
  };

  const getLatLongFromPostcode = async (postcode) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${GoogleapiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng };
      } else {
        throw new Error('Invalid postcode or no results found.');
      }
    } catch (error) {
      console.error('Error converting postcode to lat long:', error.message);
      return null;
    }
  };

  const convertPostcodesToLatLong = async () => {
    const updatedUserMarkerLocations = await Promise.all(
      events.map(async (currentEvent) => {
        try {
          const location = await getLatLongFromPostcode(currentEvent.postcode);
          if (location) {
            let { latitude, longitude } = location;
            latitude = latitude.toString()
            longitude = longitude.toString()

            return {
              ...currentEvent,
              location,
              latitude,
              longitude,
            };
          } else {
            // Handle the case when the location is null or undefined
            return null;
          }
        } catch (error) {
          console.error(error.message);
          return null;
        }
      })
    );

    // Filter out events with invalid postcodes
    const filteredLocations = updatedUserMarkerLocations.filter(
      (location) => location !== null
    );
  
    setFinalUserEvents(filteredLocations)
  };

  
  useEffect(() => {
    if (events.length > 0) {
      convertPostcodesToLatLong();
    }
  }, [events]);


  // MERGE TM AND BACKEND DATA
  useEffect(() => {
    setAllEvents([...eventData, ...finalUserEvents].slice(0, results).sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
  }, [eventData, finalUserEvents])

  useEffect(() => {
    console.log(allEvents, 'ALL EVENTS')
  }, [allEvents])
  
  return (

    <div>
          <div className="flex justify-end mt-10 mr-5 lg:mr-10">      
            <ProfileButton isLoggedIn={token !== null} />
          </div>

          <SearchBar 
            city={city}
            setCity={setCity}
            setSelectedCard={setSelectedCard}
            search={search}
            handleCurrentLocation={handleCurrentLocation}
            center={mapCenter}
            eventData={eventData}
            open={open}
            stateEvent={stateEvent}
            setStateEvent={setStateEvent}
            userStateEvent={userStateEvent}
            stateImg={stateImg}
            setStateImg={setStateImg}
            setOpen={setOpen}
            googleMapsResults={googleMapsResults}
            allMarkerLocations={allMarkerLocations}
            currentCoords={currentCoords}
            radius={radius}
            allEvents={allEvents}
            results={results}
            />

<div style={{ flex: 1, overflow: 'visible' }}>
          <div className='mt-6'>
              <div className='flex justify-between px-8'>
                <Dropdown 
                  list={list} 
                  setList={setList}/>
                {list === 'RECOMMENDED GIGS' ?
                <RefineButton 
                  setResults={setResults}
                  setRadius={setRadius}
                  getEventData={getEventData}
                  radius={radius}
                  results={results}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  /> :
                <RefineButtonUser 
                  getEventData={getEventData}
                  startDateUser={startDateUser}
                  setStartDateUser={setStartDateUser}
                  endDateUser={endDateUser}
                  setEndDateUser={setEndDateUser}
                  resultsUser={resultsUser}
                  setResultsUser={setResultsUser}
                  // userGigRadius={userGigRadius}
                  // setUserGigRadius={setUserGigRadius}
                  />}
              </div>
              <div className='w-full flex justify-center p-8'>
                {list === 'RECOMMENDED GIGS' ? (
                    <Card 
                      results={results}
                      setSelectedMarker={setSelectedMarker}
                      allEvents={allEvents}
                    />
                  ) : 
                    <InterestedEvents />
                }
              </div>
          </div>
     </div>
    </div>


  );
}
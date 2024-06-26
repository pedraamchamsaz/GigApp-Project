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
  
  // API KEYS
  const TMapiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
  const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  // SETS TOKEN, GETS CURRENT POSITION, CONVERTS CURRENT COORDS INTO GEOHASH AND GETS TM DATA
  useEffect(() => {

    // TOKEN
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } // if !token, redirect to landing page

    // FINDS CURRENT POSITION, CONVERTS TO GEOHASH, SETS LOCATION AND GETS TM DATA
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentCoords(position.coords)
          const { latitude, longitude } = position.coords
          const geoHash = Geohash.encode(latitude, longitude, 8)
          setLocation(geoHash)
          getEventData(location)
        })
      }
      console.log(currentCoords, 'CURRENT COORDS')
    }
  currentLocation()

  // BACKEND API CALL
  client
    .getAllEvents()
    .then((response) => {
      const filteredDates = response.data.filter(event => event.date >= today)
      setEvents(filteredDates);
    })
    .catch((err) => {
      console.log("failed to get API request (GET)");
    });
  }, [])


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // TM API CALL
  const getEventData = async (location) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TMapiKey}&classificationName=music&geoPoint=${location}&radius=${radius}&sort=distance,asc&size=200&startDateTime=${startDateString}&endDateTime=${endDateString}`)
      const onSale = response.data._embedded.events.filter(event => event.dates.status.code === 'onsale')
      const sortedOnSale = onSale.sort((a, b) => Date.parse(a.dates.start.localDate) - Date.parse(b.dates.start.localDate));

      // const subset = ['name', '_embedded.venues.0.city', 'dates.start.localDate', 'dates.start.localTime','images', 'url', '_embedded.venues.0.name', '_embedded.venues.0.country.countryCode', '_embedded.venues.0.postalCode', 'priceRanges.0.min', 'priceRanges.0.max', 'priceRanges.0.currency', '_embedded.venues.0.location', '_embedded.venues.0.name']

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


  // MERGE TM AND BACKEND DATA
  useEffect(() => {
    setAllEvents([...eventData, ...finalUserEvents].slice(0, results).sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
  }, [eventData, finalUserEvents])

  
  // FILTERS - RADIUS, DATE
  useEffect(() => {
    getEventData(location)
    
    client
    .getAllEvents()
    .then((response) => {
      const filteredDates = response.data.filter(event => event.date >= today)
      setEvents(filteredDates);
    })
    .catch((err) => {
      console.log("failed to get API request (GET)");
    });
  }, [results, radius, startDate, endDate])


  // IMAGE SELECTOR
  useEffect(() => {
    if (selectedMarker !== null) {
      const filteredImages = allEvents[selectedMarker].images.filter((image) => image.height === 1152);
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
    console.log(allEvents, 'ALL EVENTS')
  }, [allEvents]);


  // SEARCH FUNCTION
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

  // CURRENT LOCATION
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
  
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    }
  };

  const getLatLongFromPostcode = async (postcode) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${GoogleapiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat.toFixed(6), longitude: location.lng.toFixed(6) };
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
    const filteredLocations = updatedUserMarkerLocations
    .filter(
      (location) => location !== null
    )
    .filter(mark => getDistanceFromLatLon(currentCoords?.latitude, currentCoords?.longitude, mark.latitude, mark.longitude) <= radius);
  
    setFinalUserEvents(filteredLocations)
  };

  
  useEffect(() => {
    if (events.length > 0) {
      convertPostcodesToLatLong();
    }
  }, [events]);


  function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    const R = 3963.19; // Radius of the earth in miles
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  return (

    <div>
        <div className="flex">
          <h1 className="text-white text-center pt-8 pl-10 text-3xl w-fit mx-auto">
                  Gig<b>nite</b>
          </h1>
          <div className="flex justify-end pt-4 mr-7">      
            <ProfileButton isLoggedIn={token !== null} />
          </div>
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
            getDistanceFromLatLon={getDistanceFromLatLon}
            />

          <div className='flex justify-between px-8 absolute top-32'>
            <Dropdown 
              list={list} 
              setList={setList}/>
          </div>
          <div className='flex justify-between px-8 absolute top-32 -right-3'>
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
              />
          </div>


<div style={{ flex: 1, overflow: 'visible' }}>
          <div className='mt-6'>
              <div className='w-full flex justify-center p-8'>
                {list === 'RECOMMENDED GIGS' ? (
                    <Card 
                      results={results}
                      setSelectedMarker={setSelectedMarker}
                      allEvents={allEvents}
                      getDistanceFromLatLon={getDistanceFromLatLon}
                      currentCoords={currentCoords}
                      radius={radius}
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
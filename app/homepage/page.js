"use client";

import { useEffect, useState } from "react";
import { ApiClient } from "@/apiClient";
import ProfileEvents from "../components/ProfileEvents";
import SearchBar from "../components/SearchBar";
import ProfileButton from "../components/ProfileButton";
import Geohash from 'latlon-geohash';
import axios from 'axios'
import EventsContainer from "../components/EventsContainer";
import FilterContainer from "../components/FilterContainer";
import Dropdown from "../components/Dropdown";
import RefineButton from "../components/RefineButton";
import RefineButtonUser from "../components/RefineButtonUser";
import CardContainer from "../components/CardContainer";
import Card from "../components/Card";
import InterestedEvents from "../components/Interested";


export default function HomePage(props) {
  const [token, setToken] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [radius, setRadius] = useState(50)
  const [userGigRadius, setUserGigRadius] = useState(1000)
  const [location, setLocation] = useState(null)
  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('')
  const [userStateEvent, setUserStateEvent] = useState('')
  const [stateImg, setStateImg] = useState('')
  const [results, setResults] = useState(45)
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [markerLocations, setMarkerLocations] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);
  const [userMarkerLocations, setUserMarkerLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [list, setList] = useState('RECOMMENDED GIGS')
  const [resultsUser, setResultsUser] = useState(45)
  const [currentCoords, setCurrentCoords] = useState(null)

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
  
  const TMapiKey = process.env.NEXT_PUBLIC_TM_API_KEY;
  const GoogleapiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  

  useEffect(() => {
    console.log(eventData, "EVENT DATA")
    const sliced = eventData.slice(0, eventData.length < results ? eventData.length : results)
    let slicedOnlyCoordinates = sliced.map(event => { 
      const { latitude, longitude } = event._embedded.venues[0].location
     
      return {latitude, longitude}
    }
    )
    
    setMarkerLocations(slicedOnlyCoordinates)
  }, [eventData, results, startDate, endDate])


  useEffect(() => {
    getEventData(location)

    console.log(startDateString, endDateString)
  }, [radius, startDate, endDate])

  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentCoords(position.coords)
        })
      }
    }

    console.log(currentCoords, 'CURRENT COORDS')

  currentLocation()
  }, [])

  useEffect(() => {
    console.log(list)
  }, [list])


  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          const { latitude, longitude } = position.coords
          const geoHash = Geohash.encode(latitude, longitude, 8)
          setLocation(geoHash)
          getEventData(geoHash)
        })
      }
    }

  currentLocation()

  }, [])


  const getEventData = async (location) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TMapiKey}&classificationName=music&radius=${radius}&geoPoint=${location}&sort=distance,asc&size=120&startDateTime=${startDateString}&endDateTime=${endDateString}`)
      console.log(response.data, "DATA")
      const onSale = response.data._embedded.events.filter(event => event.dates.status.code === 'onsale')
      const sortedOnSale = onSale.sort((a, b) => Date.parse(a.dates.start.localDate) - Date.parse(b.dates.start.localDate));
      setEventData(sortedOnSale)
    } catch (e) {
      console.log(e, "ERROR")
    }
  }

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
      const filteredImages = eventData[selectedMarker].images.filter((image) => image.height === 1152);
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
  }, [selectedMarker, eventData]);

  const search = async (city) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GoogleapiKey}`
      );
      setGoogleMapsResults(googleMapsResponse.data.results);
  
      if (googleMapsResponse.data.results.length > 0) {
        const userLocation = googleMapsResponse.data.results[0].geometry.location;
        const { lat, lng } = userLocation;
        const geoHash = Geohash.encode(lat, lng, 8);
        console.log(geoHash, 'geohash');
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

    <div>
          <div className="flex justify-end mt-10 mr-5 lg:mr-10">      
            <ProfileButton isLoggedIn={token !== null} />
          </div>

          <SearchBar 
            city={city}
            setCity={setCity}
            markerLocations={markerLocations}
            setSelectedCard={setSelectedCard}
            search={search}
            handleCurrentLocation={handleCurrentLocation}
            center={mapCenter}
            userMarkerLocations={userMarkerLocations}
            eventData={eventData}
            open={open}
            stateEvent={stateEvent}
            setStateEvent={setStateEvent}
            userStateEvent={userStateEvent}
            stateImg={stateImg}
            setStateImg={setStateImg}
            setOpen={setOpen}
            currentCoords={currentCoords}
            userGigRadius={userGigRadius}
            googleMapsResults={googleMapsResults}
            />

<div style={{ flex: 1, overflow: 'visible' }}>
      <EventsContainer/>
          <div className='mt-6'>
            <FilterContainer list={list}/>
              <div className='flex justify-between px-8'>
                <Dropdown 
                  list={list} 
                  setList={setList}/>
                {props.list === 'RECOMMENDED GIGS' ?
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
                  userGigRadius={userGigRadius}
                  setUserGigRadius={setUserGigRadius}
                  />}
              </div>
            <CardContainer {...props} />
              <div className='w-full flex justify-center p-8'>
                {list === 'RECOMMENDED GIGS' ? (
                    <Card 
                      eventData={eventData}
                      results={results}
                      setSelectedMarker={setSelectedMarker}
                    />
                  ) : list === 'INTERESTED' ? (
                    <InterestedEvents />
                  ) : (
                    <ProfileEvents
                      client={client}
                      userMarkerLocations={userMarkerLocations}
                      setUserMarkerLocations={setUserMarkerLocations}
                      resultsUser={resultsUser}
                      startDateUser={startDateUser}
                      endDateUser={endDateUser}
                      currentCoords={currentCoords}
                      userGigRadius={userGigRadius}
                    />
                  )}
              </div>
          </div>
     </div>
    </div>


  );
}
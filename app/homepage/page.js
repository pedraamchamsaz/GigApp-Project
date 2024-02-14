"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";
// import GetStartedButton from "@app/components/GetStartedButton"
import HomeButton from "@/app/components/HomeButton";
import ProfileEvents from "../components/ProfileEvents";
import CardContainer from "../components/CardContainer";
import SearchBar from "../components/SearchBar";
import GetStartedButton from "../components/GetStartedButton";
import Geohash from 'latlon-geohash';
import axios from 'axios'
import EventsContainer from "../components/EventsContainer";



export default function HomePage() {
  const [token, setToken] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [radius, setRadius] = useState(10)
  const [location, setLocation] = useState(null)
  const [open, setOpen] = useState(false);
  const [stateEvent, setStateEvent] = useState('')
  const [stateImg, setStateImg] = useState('')
  const [results, setResults] = useState(15)
  const [city, setCity] = useState('');
  const [googleMapsResults, setGoogleMapsResults] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const TMapiKey = 'dKxsi9vgsD7XZlAvArfdQv46MgJABpNm';
  const GoogleapiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';
  
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  useEffect(() => {
    const currentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          const { latitude, longitude } = position.coords
          const geoHash = Geohash.encode(latitude, longitude, 8)
          console.log(geoHash)
          setLocation(geoHash)
          getEventData(geoHash)
        })
      }
    }

  currentLocation()

  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    await search(city);
    // console.log(googleMapsResults, 'GOOGLE')
    // await setLocation(city)
    // getEventData()
  };

  const search = async (city) => {
    try {
      const googleMapsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GoogleapiKey}`
      );
      setGoogleMapsResults(googleMapsResponse.data.results);
      console.log(googleMapsResults, 'HELLO')

      if (googleMapsResponse.data.results.length > 0) {
        const userLocation = googleMapsResponse.data.results[0].geometry.location;
        const {lat, lng} = userLocation
        const geoHash = Geohash.encode(lat, lng, 8)
        console.log(geoHash, 'geohash')
        setLocation(geoHash)
        getEventData(geoHash)

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

  const getEventData = async (location) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=dKxsi9vgsD7XZlAvArfdQv46MgJABpNm&classificationName=music&radius=${radius}&geoPoint=${location}&sort=date,asc&size=120`)
      console.log(response.data, "DATA")
      const onSale = response.data._embedded.events.filter(event => event.dates.status.code === 'onsale')
      setEventData(onSale)
    } catch (e) {
      console.log(e, "ERROR")
    }
  }

  useEffect(() => {
    console.log("Page Log out");
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } // if !token, redirect to landing page
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (

    <>   
      <div>
      <div className="w-[7%]">
          <GetStartedButton />
        </div>
        <SearchBar 
          city={city}
          setCity={setCity}
          setLocation={setLocation}
          getEventData={getEventData}
          googleMapsResults={googleMapsResults}
          setGoogleMapsResults={setGoogleMapsResults}
          search={search}
          handleSearch={handleSearch}
          center={mapCenter}
          />
      <div>
      <ProfileEvents client={client} />   
        </div>
         <div>
      <EventsContainer
        eventData={eventData}
        radius={radius}
        location={location}
        open={open}
        setOpen={setOpen}
        stateEvent={stateEvent}
        setStateEvent={setStateEvent}
        stateImg={stateImg}
        setStateImg={setStateImg}
        results={results}
        setResults={setResults}
        setRadius={setRadius}
        getEventData={getEventData}/>
     </div>
    </div>
    </>  

  );
}

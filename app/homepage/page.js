"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiClient } from "@/apiClient";
// import GetStartedButton from "@app/components/GetStartedButton"
import HomeButton from "@/app/components/HomeButton";
import ProfileEvents from "../components/ProfileEvents";
import SearchBar from "../components/SearchBar";
import ProfileButton from "../components/ProfileButton";
import Geohash from 'latlon-geohash';
import axios from 'axios'
import LogoutButton from "../components/logoutButton";
import EventsContainer from "../components/EventsContainer";
import InterestedEvents from "../components/Interested";



export default function HomePage(props) {
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
  const [markerLocations, setMarkerLocations] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);

  

  
  // const TMapiKey = 'dKxsi9vgsD7XZlAvArfdQv46MgJABpNm';
  const GoogleapiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';

  useEffect(() => {
    console.log(eventData, "EVENT DATA")
    const spliced = eventData.slice(0, results)
    let splicedOnlyCoordinates = spliced.map(event => {
      const { latitude, longitude } = event._embedded.venues[0].location
     
      return {latitude, longitude}
    }
    )
    
    setMarkerLocations(splicedOnlyCoordinates)
  }, [eventData, results])

  useEffect(() => {
    getEventData(location)
  }, [radius])
  
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
  };

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

  const handleClose = () => {
    console.log("this is being clicked")
    setStateEvent('')
    setOpen(false);
  };

  const handleClickOpen = (eventPassedIn) => {
    if (stateEvent) {
      return;
    }
    setOpen(true);
    setStateEvent(eventPassedIn)

    const filteredImages = eventPassedIn.images.filter(image => image.height === 1152);
    const img = filteredImages.length > 0 && filteredImages[0].url;
    setStateImg(img)
  };

  return (

    <>   
      <div>
        <div className="flex justify-end items-center ">
       {/* <img className="w-[3%] mt-15 ml-7" src='./assets/images/Logowhite.png'></img> */}
      
        <div className="ml-auto mr-4 mt-15">
        <HomeButton />
        </div>
        <div className="mr-4 mr-15">
         <ProfileButton />
        </div>
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
            handleCurrentLocation={handleCurrentLocation}
            markerLocations={markerLocations}
            setSelectedCard={setSelectedCard}
            eventData={eventData}
            open={open}
          setOpen={setOpen}
            stateEvent={stateEvent}
            setStateEvent={setStateEvent}
            stateImg={stateImg}
            setStateImg={setStateImg}
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
        setSelectedCard={setSelectedCard}
        />
     </div>
    </div>

    {/* <div>
      <InterestedEvents   /> 
    </div> */}

    </>  

  );
}

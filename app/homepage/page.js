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
  const [markerLocationsUser, setMarkerLocationsUser] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [list, setList] = useState('RECOMMENDED GIGS')
  const [resultsUser, setResultsUser] = useState(15)

  const date = new Date()
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1)
  const day = String(date.getDate())
  const dayPlusSeven = String(date.getDate() + 7)
  const today = `${year}-0${month}-${day}`
  const todayPlusSeven = `${year}-0${month}-${dayPlusSeven}`

  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(todayPlusSeven)
  const startDateString = `${startDate}T00:00:00Z`
  const endDateString = `${endDate}T23:59:59Z`

  const [startDateUser, setStartDateUser] = useState(today)
  const [endDateUser, setEndDateUser] = useState(todayPlusSeven)
  
  // const TMapiKey = 'dKxsi9vgsD7XZlAvArfdQv46MgJABpNm';
  const GoogleapiKey = 'AIzaSyDh2csaRjBg4qLiYDYOX9HaY1a1gXgjT-o';
    
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
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=dKxsi9vgsD7XZlAvArfdQv46MgJABpNm&classificationName=music&radius=${radius}&geoPoint=${location}&sort=date,asc&size=120&startDateTime=${startDateString}&endDateTime=${endDateString}`)
      console.log(response.data, "DATA")
      const onSale = response.data._embedded.events.filter(event => event.dates.status.code === 'onsale')
      setEventData(onSale)
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

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    eventsArray = client.getSavedEvents()
    setSavedEvents(eventsArray)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
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
    setSelectedMarker(null)
    // handleMarkerClick(index)
  };

  const handleClose = () => {
    setStateEvent('')
    setOpen(false);
  };

  useEffect(() => {
    if (selectedMarker !== null) {
      const filteredImages = eventData[selectedMarker].images.filter((image) => image.height === 1152);
      const img = filteredImages.length > 0 && filteredImages[0].url;
      setStateImg(img);
    }
  }, [selectedMarker, eventData]);

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
            center={mapCenter}
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
      {/* <div>
      <ProfileEvents client={client} />   
        </div> */}
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
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setList={setList}
        list={list}
        client={client}
        resultsUser={resultsUser}
        setResultsUser={setResultsUser}
        startDateUser={startDateUser}
        setStartDateUser={setStartDateUser}
        endDateUser={endDateUser}
        setEndDateUser={setEndDateUser}
        today={today}
        setMarkerLocationsUser={setMarkerLocationsUser}
        />
     </div>
    </div>
    </>  

  );
}
